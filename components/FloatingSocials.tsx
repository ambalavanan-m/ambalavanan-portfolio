import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialLink {
    name: string;
    icon: string;
    href: string;
    color: string;
    type: 'github' | 'x' | 'threads' | 'instagram';
    previewHtml?: string;
}

const FloatingSocials: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // For mobile toggle
    const [activePreview, setActivePreview] = useState<SocialLink | null>(null);

    const socials: SocialLink[] = [
        {
            name: 'GitHub',
            icon: 'fa-brands fa-github',
            href: 'https://github.com/ambalavanan01',
            color: 'text-slate-700 hover:text-slate-900',
            type: 'github',
        },
        {
            name: 'X (Twitter)',
            icon: 'fa-brands fa-x-twitter',
            href: 'https://x.com/iam_ambalavanan/status/2029158257458331672',
            color: 'text-slate-700 hover:text-black',
            type: 'x',
            previewHtml: `<blockquote class="twitter-tweet" data-theme="light"><p lang="en" dir="ltr">My Presonal Portfolio link <a href="https://t.co/ylZplgMz43">https://t.co/ylZplgMz43</a> <a href="https://t.co/kW79qICHjk">pic.twitter.com/kW79qICHjk</a></p>&mdash; Ambalavanan M (@iam_ambalavanan) <a href="https://twitter.com/iam_ambalavanan/status/2029158257458331672?ref_src=twsrc%5Etfw">March 4, 2026</a></blockquote>`,
        },
        {
            name: 'Threads',
            icon: 'fa-brands fa-threads',
            href: 'https://www.threads.net/@iam_ambalavanan/post/DVdP2dCE_kf',
            color: 'text-slate-700 hover:text-black',
            type: 'threads',
            previewHtml: `<blockquote class="text-post-media" data-text-post-permalink="https://www.threads.com/@iam_ambalavanan/post/DVdP2dCE_kf" data-text-post-version="0" id="ig-tp-DVdP2dCE_kf" style=" background:#FFF; border-width: 1px; border-style: solid; border-color: #00000026; border-radius: 16px; max-width:650px; margin: 1px; min-width:270px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"> <a href="https://www.threads.com/@iam_ambalavanan/post/DVdP2dCE_kf" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%; font-family: -apple-system, BlinkMacSystemFont, sans-serif;" target="_blank"> <div style=" padding: 40px; display: flex; flex-direction: column; align-items: center;"><div style=" display:block; height:32px; width:32px; padding-bottom:20px;"> <svg aria-label="Threads" height="32px" role="img" viewBox="0 0 192 192" width="32px" xmlns="http://www.w3.org/2000/svg"> <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" /></svg></div><div style=" font-size: 15px; line-height: 21px; color: #000000; font-weight: 600; "> View on Threads</div></div></a></blockquote>`,
        },
        {
            name: 'Instagram',
            icon: 'fa-brands fa-instagram',
            href: 'https://www.instagram.com/iam_ambalavanan/',
            color: 'text-[#E1306C] hover:text-[#C13584]',
            type: 'instagram',
        },
    ];

    // Function to render preview content
    const renderPreviewContent = (social: SocialLink) => {
        if (social.previewHtml) {
            return (
                <div className="w-full h-full overflow-y-auto bg-white p-4 flex flex-col items-center">
                    <div className="w-full max-w-full" dangerouslySetInnerHTML={{ __html: social.previewHtml }}></div>
                </div>
            );
        }

        switch (social.type) {
            case 'github':
                return (
                    <div className="w-full h-full bg-slate-900 text-white p-8 rounded-xl flex flex-col items-center justify-center text-center gap-6">
                        <i className="fa-brands fa-github text-7xl mb-2"></i>
                        <h4 className="text-2xl font-bold">@ambalavanan01</h4>
                        <p className="text-slate-400">View my open-source contributions and projects on GitHub.</p>
                        <a href={social.href} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-colors">
                            Visit Profile
                        </a>
                    </div>
                );
            case 'instagram':
                return (
                    <div className="w-full h-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white p-8 rounded-xl flex flex-col items-center justify-center text-center gap-6">
                        <i className="fa-brands fa-instagram text-7xl mb-2"></i>
                        <h4 className="text-2xl font-bold">@iam_ambalavanan</h4>
                        <p className="text-white/80">Follow my creative journey on Instagram.</p>
                        <a href={social.href} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors">
                            View Instagram
                        </a>
                    </div>
                );
            default:
                return null;
        }
    };

    // Load widget scripts when modal opens
    useEffect(() => {
        if (activePreview?.type === 'x') {
            const script = document.createElement('script');
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            script.charset = "utf-8";
            document.body.appendChild(script);

            script.onload = () => {
                // @ts-ignore
                if (window.twttr && window.twttr.widgets) {
                    // @ts-ignore
                    window.twttr.widgets.load();
                }
            };

            return () => {
                const existing = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
                if (existing) document.body.removeChild(existing);
            };
        }

        if (activePreview?.type === 'threads') {
            const script = document.createElement('script');
            script.src = "https://www.threads.net/embed.js";
            script.async = true;
            document.body.appendChild(script);
            return () => {
                const existing = document.querySelector('script[src="https://www.threads.net/embed.js"]');
                if (existing) document.body.removeChild(existing);
            };
        }
    }, [activePreview]);

    return (
        <>
            {/* Floating Action Button (Mobile/Tablet/Desktop View) */}
            <div className="fixed right-6 bottom-6 z-50">
                <AnimatePresence>
                    {isOpen && (
                        <div className="flex flex-col-reverse items-center gap-4 mb-4">
                            {socials.map((social, index) => (
                                <motion.button
                                    key={social.name}
                                    onClick={() => {
                                        setActivePreview(social);
                                        setIsOpen(false);
                                    }}
                                    initial={{ opacity: 0, scale: 0, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0, y: 20 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                    className={`w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform hover:scale-110 ${social.color}`}
                                >
                                    <i className={`${social.icon} text-lg`}></i>
                                </motion.button>
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-full bg-primary text-white shadow-xl flex items-center justify-center text-2xl z-50 transition-all hover:bg-primary/90"
                >
                    <motion.i
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        className={`fa-solid ${isOpen ? 'fa-plus' : 'fa-share-nodes'}`}
                    ></motion.i>
                </motion.button>
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
                {activePreview && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActivePreview(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        ></motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-[500px] aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                        >
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
                                <span className="font-bold text-slate-800 flex items-center gap-2">
                                    <i className={activePreview.icon}></i> {activePreview.name}
                                </span>
                                <button
                                    onClick={() => setActivePreview(null)}
                                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>

                            <div className="flex-1 w-full h-full overflow-hidden">
                                {renderPreviewContent(activePreview)}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingSocials;
