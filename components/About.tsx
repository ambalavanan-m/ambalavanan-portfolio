import React from 'react';
import FadeIn from './FadeIn';
import { GitHubCalendar } from 'react-github-calendar';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import StarRating from './StarRating';
import { Star, MessageSquare, Quote, Pin } from 'lucide-react';

const About: React.FC = () => {
  const [averageRating, setAverageRating] = React.useState<number | null>(null);
  const [totalReviews, setTotalReviews] = React.useState<number>(0);
  const [pinnedReview, setPinnedReview] = React.useState<any>(null);

  React.useEffect(() => {
    const q = query(collection(db, 'reviews'), where('status', '==', 'approved'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviews = querySnapshot.docs.map(doc => doc.data());
      setTotalReviews(reviews.length);
      if (reviews.length > 0) {
        const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
        setAverageRating(Number((total / reviews.length).toFixed(1)));
      } else {
        setAverageRating(null);
      }

      const pinned = reviews.find(r => r.isPinned === true);
      setPinnedReview(pinned || null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="about" className="py-24 bg-white  transition-colors duration-300 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">

          {/* Left: Animation Area */}
          <div className="w-full md:w-1/2 flex justify-center">
            <FadeIn direction="up">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-slate-50  p-8 flex items-center justify-center overflow-hidden group shadow-inner">
                {/* Floating Elements */}
                <img
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Technologist.png"
                  alt="Coding Animation"
                  className="w-64 h-64 object-contain animate-float drop-shadow-xl transition-all duration-500 transform group-hover:scale-110"
                />

                <div className="absolute bottom-10 left-10 bg-white/90  backdrop-blur-md border border-slate-100  p-4 rounded-xl shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-mono text-slate-600 ">Open to opportunities</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-1/2 space-y-8">
            <FadeIn direction="up" delay={200}>
              <div className="space-y-2">
                <h2 className="text-primary font-bold tracking-widest uppercase text-sm">About Me</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 ">Passionate <br />Developer</h3>
              </div>

              <div className="text-slate-600  space-y-4 leading-relaxed text-lg">
                <p>
                  I am a motivated <strong className="text-slate-900 ">Developer</strong> with a solid grasp of <span className="text-primary font-medium">Java, Python, C++, and Web Technologies</span>. I enjoy solving algorithmic problems and building useful applications.
                </p>
                <p>
                  My portfolio features projects ranging from <strong className="text-slate-800 ">Crisis Management</strong> to <strong className="text-slate-800 ">Blockchain Voting</strong>, reflecting my interest in secure and impactful software development.
                </p>
              </div>

              <div className="grid gap-6 pt-4">
                <div className="pt-6 w-full overflow-hidden">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                    <i className="fa-brands fa-github text-primary mr-2"></i>
                    GitHub Contributions (January {new Date().getFullYear()} - December {new Date().getFullYear()})
                  </h4>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex justify-center text-xs sm:text-sm">
                    <GitHubCalendar
                      username="ambalavanan01"
                      year={new Date().getFullYear()}
                      blockSize={12}
                      blockMargin={4}
                      fontSize={12}
                      colorScheme="light"
                    />
                  </div>
                </div>

                {/* Community Feedback Panel */}
                <div className="pt-6">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center justify-between">
                    <span>
                      <MessageSquare size={16} className="inline-flex mr-2 text-primary" />
                      Community Feedback
                    </span>
                    <span className="text-xs font-medium text-slate-400 normal-case">{totalReviews} Reviews</span>
                  </h4>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Stats Card */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-600">
                          <Star size={24} fill="currentColor" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-slate-900">{averageRating || '0.0'}</p>
                          <p className="text-xs text-slate-500 font-medium">Average Rating</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <StarRating rating={Math.round(averageRating || 0)} />
                      </div>
                    </div>

                    {/* Pinned Testimonial */}
                    {pinnedReview && (
                      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100/50 rounded-2xl p-6 overflow-hidden group">
                        <div className="absolute top-4 right-4 text-blue-400 opacity-20 group-hover:opacity-40 transition-opacity">
                          <Quote size={40} />
                        </div>
                        <div className="absolute -left-1 top-0 bottom-0 w-1 bg-primary rounded-l-2xl"></div>
                        <div className="flex items-center gap-2 mb-3 text-primary">
                          <Pin size={14} className="fill-current" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Featured Review</span>
                        </div>
                        <p className="text-slate-700 italic text-sm leading-relaxed mb-4 relative z-10">
                          "{pinnedReview.comment}"
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                            {pinnedReview.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{pinnedReview.name}</p>
                            <p className="text-[10px] text-slate-500">Verified Client</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 flex justify-start">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-primary hover:text-secondary font-bold transition-colors group"
                  >
                    Get in touch <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
