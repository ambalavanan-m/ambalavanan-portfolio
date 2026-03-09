import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import StarRating from './StarRating';
import { Check, X, Trash2, Clock, Pin, PinOff } from 'lucide-react';
import { getDocs, where, writeBatch } from 'firebase/firestore';

const AdminPanel: React.FC = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const reviewsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReviews(reviewsData);
            setLoading(loading && false); // Only set loading false once
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            await updateDoc(doc(db, 'reviews', id), {
                status: 'approved'
            });
            toast.success('Review approved!');
        } catch (error) {
            toast.error('Failed to approve review.');
        }
    };

    const handlePin = async (id: string, isCurrentlyPinned: boolean) => {
        try {
            if (!isCurrentlyPinned) {
                // Unpin all other reviews first
                const batch = writeBatch(db);
                const pinnedQuery = query(collection(db, 'reviews'), where('isPinned', '==', true));
                const pinnedDocs = await getDocs(pinnedQuery);
                pinnedDocs.forEach((doc) => {
                    batch.update(doc.ref, { isPinned: false });
                });
                // Pin the new one
                batch.update(doc(db, 'reviews', id), { isPinned: true });
                await batch.commit();
                toast.success('Review pinned!');
            } else {
                await updateDoc(doc(db, 'reviews', id), { isPinned: false });
                toast.success('Review unpinned!');
            }
        } catch (error) {
            console.error('Error pinning review:', error);
            toast.error('Failed to pin review.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        try {
            await deleteDoc(doc(db, 'reviews', id));
            toast.success('Review deleted!');
        } catch (error) {
            toast.error('Failed to delete review.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white text-xl animate-pulse">Loading Admin Panel...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 p-8 text-white">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Admin Review Panel
                        </h1>
                        <p className="text-slate-400 mt-2">Manage and approve user testimonials</p>
                    </div>
                    <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-blue-400 font-bold">{reviews.length}</span> Total Reviews
                    </div>
                </header>

                <div className="grid gap-6">
                    {reviews.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                            <p className="text-slate-500">No reviews found.</p>
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div
                                key={review.id}
                                className={`p-6 rounded-2xl border transition-all duration-300 ${review.status === 'pending'
                                    ? 'bg-blue-500/5 border-blue-500/20'
                                    : 'bg-white/5 border-white/10'
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-grow space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xl">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">{review.name}</h3>
                                                <p className="text-sm text-slate-400">{review.email}</p>
                                            </div>
                                            {review.status === 'pending' && (
                                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full flex items-center gap-1">
                                                    <Clock size={12} /> Pending
                                                </span>
                                            )}
                                        </div>

                                        <StarRating rating={review.rating} />

                                        <p className="text-slate-300 italic text-lg line-clamp-3">
                                            "{review.comment}"
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            Submitted on: {review.createdAt?.toDate().toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex md:flex-col gap-3 justify-end whitespace-nowrap">
                                        {review.status === 'pending' && (
                                            <button
                                                onClick={() => handleApprove(review.id)}
                                                className="flex-1 md:flex-none px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Check size={18} /> Approve
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handlePin(review.id, review.isPinned)}
                                            className={`flex-1 md:flex-none px-6 py-3 font-bold rounded-xl transition-all border flex items-center justify-center gap-2 ${review.isPinned
                                                ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/30'
                                                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                                }`}
                                        >
                                            {review.isPinned ? <PinOff size={18} /> : <Pin size={18} />}
                                            {review.isPinned ? 'Unpin' : 'Pin Review'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="flex-1 md:flex-none px-6 py-3 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-bold rounded-xl transition-all border border-red-600/20 flex items-center justify-center gap-2"
                                        >
                                            <Trash2 size={18} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
