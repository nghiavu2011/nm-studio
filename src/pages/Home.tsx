import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Coins, Plus } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import HeroCarousel from '../components/HeroCarousel';
import Counter from '../components/Counter';
import { PROCESS_DATA, SERVICES_BRIEF } from '../constants';

interface HomeProps {
    content: any;
}

const Home = ({ content }: HomeProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const projectsRef = useRef<HTMLDivElement>(null);

    const [activeProcessTab, setActiveProcessTab] = useState<keyof typeof PROCESS_DATA>('arch');
    const [activeProjectCategory, setActiveProjectCategory] = useState('all');
    const [showAllProjects, setShowAllProjects] = useState(false);

    const { hero_images, project_categories, projects: defaultProjects } = content;
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        // Merge default and dynamic projects
        setProjects(defaultProjects || []);

        const fetchDynamicProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const dynamicProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Dynamic projects first, then default
                setProjects(prev => [...dynamicProjects, ...prev]);
            } catch (e) {
                console.error("Failed to fetch dynamic projects:", e);
            }
        };

        fetchDynamicProjects();
    }, [defaultProjects]);

    useEffect(() => {
        if (location.state?.scrollTo === 'projects') {
            setTimeout(() => {
                projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            // Optional: Clear state so it doesn't scroll on refresh?
            // window.history.replaceState({}, ''); 
        }
    }, [location]);

    const filteredProjects = activeProjectCategory === 'all'
        ? projects
        : projects.filter((p: any) => p.category === activeProjectCategory);

    const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3);

    const activeHeader = (project_categories || []).find((c: any) => c.id === activeProjectCategory)?.header || 'TẤT CẢ DỰ ÁN';

    return (
        <>
            <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
                <HeroCarousel heroImages={hero_images} />
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 leading-tight">
                        Giải pháp không gian từ ý tưởng đến hoàn thiện
                    </h1>
                    <p className="text-sm md:text-base text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Thiết kế, thi công, diễn hoạ và sáng tạo bằng AI
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <a href="#projects" onClick={(e) => { e.preventDefault(); projectsRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-brand-primary py-4 px-10 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">XEM CÔNG TRÌNH THỰC TẾ</a>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 border-b border-gray-100">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                    {[
                        { v: 15, l: 'NĂM KINH NGHIỆM' },
                        { v: 250, l: 'CÔNG TRÌNH HOÀN THIỆN' },
                        { v: 10, l: 'TỈNH THÀNH / QUỐC GIA' }
                    ].map((s, i) => (
                        <div key={i} className="group cursor-default flex flex-col items-center">
                            <Counter target={s.v} />
                            <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-2 font-bold">{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="services" className="py-24 bg-white border-b border-gray-50 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-widest">DỊCH VỤ CUNG CẤP</h2>
                        <div className="w-20 h-1 bg-brand-primary mx-auto mt-6"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {SERVICES_BRIEF.map((s, i) => (
                            <div key={i} onClick={() => navigate('/services')} className="group relative overflow-hidden h-[350px] cursor-pointer shadow-lg rounded-sm">
                                <img src={s.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={s.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                    <div className="text-brand-primary mb-3 transition-transform group-hover:-translate-y-1">{s.icon}</div>
                                    <h3 className="text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.15em] leading-tight">{s.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-[#e0ddd2] text-gray-900 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center mb-16 overflow-x-auto scrollbar-hide pb-4">
                        <div className="inline-flex bg-white/50 p-1 rounded-sm border border-black/5 whitespace-nowrap shadow-sm">
                            {Object.keys(PROCESS_DATA).map((key) => (
                                <button key={key} onClick={() => setActiveProcessTab(key as keyof typeof PROCESS_DATA)} className={`px-5 py-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeProcessTab === key ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-500 hover:text-brand-primary'}`}>
                                    {PROCESS_DATA[key as keyof typeof PROCESS_DATA].label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto relative px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {PROCESS_DATA[activeProcessTab].stages.map((stage: any, i: number) => (
                                <div key={i} className="relative group animate-fadeIn flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center z-10 group-hover:border-brand-primary transition-all shadow-md mb-6">
                                        <div className="text-gray-400 group-hover:text-brand-primary transition-all scale-75">{stage.icon}</div>
                                    </div>
                                    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-sm border border-black/5 group-hover:border-brand-primary/20 transition-all flex flex-col items-center w-full h-full shadow-sm hover:shadow-xl group-hover:bg-white">
                                        <h5 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-2">{stage.title}</h5>
                                        <h4 className="text-sm md:text-base font-bold mb-4 uppercase tracking-widest min-h-[40px] flex items-center justify-center text-gray-800">{stage.subtitle}</h4>
                                        <p className="text-gray-600 text-[11px] font-medium tracking-widest leading-relaxed mb-6">{stage.desc}</p>
                                        {stage.pay && (
                                            <div className="mt-auto flex items-center gap-2 bg-brand-primary/10 py-2 px-4 rounded-sm border border-brand-primary/10 w-fit">
                                                <Coins className="w-3 h-3 text-brand-primary" />
                                                <span className="text-[9px] font-bold text-brand-primary uppercase tracking-widest leading-none">THỐNG TOÁN: {stage.pay.replace('💰', '').trim()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="projects" ref={projectsRef} className="py-24 bg-gray-50 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="w-full md:w-1/2">
                            <h4 className="text-brand-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 uppercase">DỰ ÁN</h4>
                            <h2 className="text-4xl font-heading font-bold uppercase tracking-widest transition-all animate-fadeIn">{activeHeader}</h2>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-end">
                            <div className="flex flex-wrap gap-2 justify-end bg-white/50 p-2 border border-gray-100 rounded-sm">
                                {(project_categories || []).map((cat: any) => (
                                    <button key={cat.id} onClick={() => { setActiveProjectCategory(cat.id); setShowAllProjects(false); }} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeProjectCategory === cat.id ? 'bg-brand-primary text-white shadow-sm' : 'text-gray-400 hover:text-brand-primary'}`}>
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {visibleProjects.length > 0 ? (
                            visibleProjects.map((p: any) => (
                                <div key={p.id} onClick={() => navigate(`/project/${p.id}`)} className="group cursor-pointer bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 rounded-sm">
                                    <div className="relative overflow-hidden aspect-[4/3]">
                                        <img src={p.gallery[0] || 'placeholder.jpg'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={p.title} />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                    </div>
                                    <div className="p-8 flex justify-between items-center text-center">
                                        <div className="w-full">
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors uppercase">{p.title}</h3>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{p.floors} • {p.area} • {p.style}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center opacity-40">
                                <p className="text-[10px] uppercase font-bold tracking-widest">Đang cập nhật thêm dự án trong mục này...</p>
                            </div>
                        )}
                    </div>

                    {!showAllProjects && filteredProjects.length > 3 && (
                        <div className="flex justify-center mt-16 animate-fadeIn">
                            <button
                                onClick={() => setShowAllProjects(true)}
                                className="border-2 border-[#705d3f] text-[#705d3f] px-12 py-4 text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-[#705d3f] hover:text-white transition-all rounded-sm shadow-md flex items-center gap-4 group"
                            >
                                TẢI THÊM <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Home;
