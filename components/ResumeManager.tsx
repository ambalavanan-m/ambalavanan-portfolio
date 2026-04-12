import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { ResumeData, ResumeEducation, ResumeProject } from '../types';
import { Plus, Trash2, Save, Download, FileText } from 'lucide-react';
import { SKILL_CATEGORIES } from '../constants';
import { generateResumePDF } from '../utils/resumePdf';
import { generateResumeDocx } from '../utils/resumeDocx';


const DEFAULT_RESUME: ResumeData = {
    name: 'Ambalavanan M',
    title: 'Software Developer',
    summary: 'Results-oriented Software Developer and AWS Certified Cloud Practitioner with a comprehensive foundation in Java, Python, C++, C, and Web Technologies (HTML, CSS, JavaScript). Technical expertise spans across robust solution development, bolstered by a strong command of Core Concepts (DSA, OOP, DBMS, SQL) and modern Tools & Platforms (Git, GitHub). Proven track record of engineering diverse, high-impact applications, including scalable AWS Cloud Architectures (S3, Lambda, API Gateway, CloudFront), Machine Learning (Linear Regression) models, and secure Blockchain (Solidity) systems. Driven by solving complex algorithmic challenges and creating innovative, effective software solutions.',
    phone: '+91 9894797490',
    email: 'ambalavanan275@gmail.com',
    github: 'ambalavanan01',
    linkedin: 'ambalavanan-m',
    skills: SKILL_CATEGORIES.map(cat => ({
        id: crypto.randomUUID(),
        category: cat.title,
        items: cat.skills.map(s => s.name).join(', ')
    })),
    education: [
        {
            id: crypto.randomUUID(),
            degree: 'BSc Computer Science',
            institution: 'VIT University Vellore',
            year: 'Expected Graduation: 2027'
        }
    ],
    projects: [
        {
            id: crypto.randomUUID(),
            title: 'Crisis Response Management',
            techStack: 'HTML, CSS, JavaScript',
            description: 'A comprehensive system to coordinate resources and communication efficiently during emergency crises.',
        },
        {
            id: crypto.randomUUID(),
            title: 'E-Voting Using Blockchain',
            techStack: 'HTML, CSS, JavaScript, Solidity, Blockchain',
            description: 'Secure and transparent voting application leveraging blockchain technology to prevent fraud and tampering.',
        },
        {
            id: crypto.randomUUID(),
            title: 'Loan Approval Prediction',
            techStack: 'Python, Machine Learning, AWS, React',
            description: 'The AI Loan Prediction Portal is a comprehensive, end-to-end Machine Learning web application designed to assess and predict loan approval statuses instantly. By leveraging historical financial data and modern cloud architecture, this project bridges the gap between raw datasets and a fully functional user-facing product.',
        }
    ]
};

const ResumeManager: React.FC = () => {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const docRef = doc(db, 'resume', 'main');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setResumeData(docSnap.data() as ResumeData);
            } else {
                setResumeData(DEFAULT_RESUME);
            }
        } catch (error) {
            console.error("Error fetching resume:", error);
            toast.error("Failed to load resume data");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!resumeData) return;
        setSaving(true);
        try {
            await setDoc(doc(db, 'resume', 'main'), resumeData);
            toast.success("Resume saved successfully!");
        } catch (error) {
            console.error("Error saving resume:", error);
            toast.error("Failed to save resume");
        } finally {
            setSaving(false);
        }
    };

    const seedDefault = async () => {
        if (!window.confirm("This will overwrite your current resume data with the default template. Continue?")) return;
        setResumeData(DEFAULT_RESUME);
        try {
            setSaving(true);
            await setDoc(doc(db, 'resume', 'main'), DEFAULT_RESUME);
            toast.success("Default resume loaded and saved!");
        } catch (error) {
            toast.error("Failed to save default resume");
        } finally {
            setSaving(false);
        }
    };

    const handleDownloadPdf = async () => {
        if (!resumeData) return;
        try {
            toast.loading("Generating Professional PDF...", { id: "pdf-toast" });
            generateResumePDF(resumeData);
            toast.success("Premium PDF Downloaded!", { id: "pdf-toast" });
        } catch (error: any) {
            console.error("Error generating PDF:", error);
            const errMsg = error?.message || String(error);
            toast.error(`Failed to generate PDF: ${errMsg}`, { id: "pdf-toast", duration: 6000 });
        }
    };

    const handleDownloadDocx = async () => {
        if (!resumeData) return;
        try {
            toast.loading("Generating Word Document...", { id: "docx-toast" });
            await generateResumeDocx(resumeData);
            toast.success("Word Document Downloaded!", { id: "docx-toast" });
        } catch (error: any) {
            console.error("Error generating Word doc:", error);
            const errMsg = error?.message || String(error);
            toast.error(`Failed to generate Word doc: ${errMsg}`, { id: "docx-toast" });
        }
    };

    if (loading) return <div className="text-slate-400 p-8">Loading Resume Editor...</div>;
    if (!resumeData) return null;


    return (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 space-y-12 shadow-sm studio-card">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-8 border-b border-slate-100 gap-6">
                <div>
                    <h2 className="text-2xl font-extrabold text-text uppercase tracking-tight">Resume <span className="text-primary italic">Engine</span></h2>
                    <p className="text-slate-500 mt-2 text-[10px] font-bold uppercase tracking-widest">Dynamic Document Construction</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={handleDownloadPdf}
                        className="px-5 py-2.5 bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white rounded-xl transition-all border border-purple-100 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-2"
                    >
                        <FileText size={14} /> Global PDF
                    </button>
                    <button
                        onClick={handleDownloadDocx}
                        className="px-5 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all border border-blue-100 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-2"
                    >
                        <FileText size={14} /> MS Word
                    </button>
                    <button 
                        onClick={seedDefault}
                        className="px-5 py-2.5 bg-yellow-50 text-yellow-600 hover:bg-yellow-500 hover:text-white rounded-xl transition-colors border border-yellow-100 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-2"
                    >
                        <Download size={14} /> Reset
                    </button>

                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2.5 bg-text hover:bg-primary text-white rounded-xl transition-colors font-extrabold text-[10px] uppercase tracking-widest flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-text/5"
                    >
                        <Save size={14} /> {saving ? 'Syncing...' : 'Deploy Changes'}
                    </button>
                </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] pb-4 border-b border-slate-50">Identity Matrix</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input type="text" placeholder="Name" value={resumeData.name} onChange={e => setResumeData({...resumeData, name: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-text placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium w-full" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Designation</label>
                        <input type="text" placeholder="Job Title" value={resumeData.title} onChange={e => setResumeData({...resumeData, title: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-text placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium w-full" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Comm Link (Phone)</label>
                        <input type="text" placeholder="Phone" value={resumeData.phone} onChange={e => setResumeData({...resumeData, phone: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-text placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium w-full" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Internal Mail</label>
                        <input type="email" placeholder="Email" value={resumeData.email} onChange={e => setResumeData({...resumeData, email: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-text placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium w-full" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Git Repository</label>
                        <input type="text" placeholder="GitHub Username" value={resumeData.github} onChange={e => setResumeData({...resumeData, github: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-text placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium w-full" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Professional Link</label>
                        <input type="text" placeholder="LinkedIn Username" value={resumeData.linkedin} onChange={e => setResumeData({...resumeData, linkedin: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-text placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium w-full" />
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="space-y-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] pb-4 border-b border-slate-50">Executive Abstract</h3>
                <textarea 
                    rows={5}
                    value={resumeData.summary} 
                    onChange={e => setResumeData({...resumeData, summary: e.target.value})} 
                    className="bg-slate-50 border border-slate-200 rounded-[1.5rem] px-6 py-5 text-text placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium w-full resize-none leading-relaxed" 
                    placeholder="Enter your professional summary..."
                />
            </div>

            {/* Skills */}
            <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Competency Modules</h3>
                    <button onClick={() => setResumeData({...resumeData, skills: [...resumeData.skills, { id: crypto.randomUUID(), category: 'New Module', items: '' }]})} className="text-primary hover:text-primary-hover flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest"><Plus size={14}/> Add Module</button>
                </div>
                <div className="grid gap-4">
                    {resumeData.skills.map((skill, index) => (
                        <div key={skill.id} className="bg-white border border-slate-100 p-5 rounded-2xl flex flex-col md:flex-row gap-5 items-start md:items-center hover:border-primary/10 transition-all">
                            <input type="text" placeholder="Category" value={skill.category} onChange={e => {
                                const newSkills = [...resumeData.skills];
                                newSkills[index].category = e.target.value;
                                setResumeData({...resumeData, skills: newSkills});
                            }} className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-text text-sm font-bold w-full md:w-1/3 outline-none focus:border-primary/30" />
                            <input type="text" placeholder="Items (comma-separated)" value={skill.items} onChange={e => {
                                const newSkills = [...resumeData.skills];
                                newSkills[index].items = e.target.value;
                                setResumeData({...resumeData, skills: newSkills});
                            }} className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-text text-sm font-medium w-full outline-none focus:border-primary/30" />
                            <button onClick={() => {
                                setResumeData({...resumeData, skills: resumeData.skills.filter(s => s.id !== skill.id)});
                            }} className="text-red-400 p-2.5 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"><Trash2 size={18} /></button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Academic Records</h3>
                    <button onClick={() => setResumeData({...resumeData, education: [...resumeData.education, { id: crypto.randomUUID(), degree: '', institution: '', year: '' }]})} className="text-primary hover:text-primary-hover flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest"><Plus size={14}/> Add Entry</button>
                </div>
                <div className="grid gap-4">
                    {resumeData.education.map((edu, index) => (
                        <div key={edu.id} className="bg-white border border-slate-100 p-6 rounded-2xl relative group hover:border-primary/10 transition-all">
                            <button onClick={() => {
                                setResumeData({...resumeData, education: resumeData.education.filter(e => e.id !== edu.id)});
                            }} className="absolute top-4 right-4 text-red-400 p-2.5 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 transition-all"><Trash2 size={18} /></button>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-12">
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Degree / Certification</label>
                                    <input type="text" value={edu.degree} onChange={e => {
                                        const newEdu = [...resumeData.education];
                                        newEdu[index].degree = e.target.value;
                                        setResumeData({...resumeData, education: newEdu});
                                    }} className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-text text-sm font-bold w-full outline-none focus:border-primary/30" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Institution</label>
                                    <input type="text" value={edu.institution} onChange={e => {
                                        const newEdu = [...resumeData.education];
                                        newEdu[index].institution = e.target.value;
                                        setResumeData({...resumeData, education: newEdu});
                                    }} className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-text text-sm font-medium w-full outline-none focus:border-primary/30" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Timeline</label>
                                    <input type="text" value={edu.year} onChange={e => {
                                        const newEdu = [...resumeData.education];
                                        newEdu[index].year = e.target.value;
                                        setResumeData({...resumeData, education: newEdu});
                                    }} className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-text text-sm font-medium w-full outline-none focus:border-primary/30" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Projects */}
            <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Project Deployments</h3>
                    <button onClick={() => setResumeData({...resumeData, projects: [...resumeData.projects, { id: crypto.randomUUID(), title: '', techStack: '', description: '' }]})} className="text-primary hover:text-primary-hover flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest"><Plus size={14}/> Add Project</button>
                </div>
                <div className="grid gap-6">
                    {resumeData.projects.map((proj, index) => (
                        <div key={proj.id} className="bg-white border border-slate-100 p-8 rounded-[2rem] relative group space-y-5 hover:border-primary/10 transition-all">
                            <button onClick={() => {
                                setResumeData({...resumeData, projects: resumeData.projects.filter(p => p.id !== proj.id)});
                            }} className="absolute top-4 right-4 text-red-400 p-2.5 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 transition-all"><Trash2 size={18} /></button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-12">
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Title</label>
                                    <input type="text" value={proj.title} onChange={e => {
                                        const newProj = [...resumeData.projects];
                                        newProj[index].title = e.target.value;
                                        setResumeData({...resumeData, projects: newProj});
                                    }} className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-text text-sm font-bold w-full outline-none focus:border-primary/30" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tech Stack</label>
                                    <input type="text" value={proj.techStack} onChange={e => {
                                        const newProj = [...resumeData.projects];
                                        newProj[index].techStack = e.target.value;
                                        setResumeData({...resumeData, projects: newProj});
                                    }} className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-text text-sm font-medium w-full outline-none focus:border-primary/30" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Operation Description</label>
                                <textarea rows={3} value={proj.description} onChange={e => {
                                        const newProj = [...resumeData.projects];
                                        newProj[index].description = e.target.value;
                                        setResumeData({...resumeData, projects: newProj});
                                    }} className="bg-slate-50 px-5 py-4 rounded-2xl border border-slate-100 text-text text-sm font-medium w-full outline-none focus:border-primary/30 resize-none leading-relaxed" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="pt-10 flex justify-end">
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="px-12 py-4 bg-text hover:bg-primary text-white rounded-2xl transition-all font-extrabold text-xs uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-text/5 active:scale-95 disabled:opacity-50"
                >
                    <Save size={18} /> {saving ? 'Committing...' : 'Save Current State'}
                </button>
            </div>
        </div>
    );
};

export default ResumeManager;
