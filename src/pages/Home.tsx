import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Coins, Plus, Wand2, Calendar, ArrowRight } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { db } from '../lib/firebase';
import HeroCarousel from '../components/HeroCarousel';
import Counter from '../components/Counter';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { PROCESS_DATA, SERVICES_BRIEF } from '../constants';

interface HomeProps {
    content: any;
}

const Home = ({ content }: HomeProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const projectsRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

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
        }
    }, [location]);

    const filteredProjects = activeProjectCategory === 'all'
        ? projects
        : projects.filter((p: any) => p.category === activeProjectCategory);

    const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3);

    const activeHeader = (project_categories || []).find((c: any) => c.id === activeProjectCategory)?.header || t('home.projectsTitle');

    return (
        <>
            <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
                <HeroCarousel heroImages={hero_images} />
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading font-bold mb-4 leading-tight drop-shadow-lg"
                    >
                        {(t('home.heroTitle') || '').split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm md:text-lg text-gray-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md"
                    >
                        {t('home.heroDesc')}
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col md:flex-row gap-4 justify-center"
                    >
                        <a href="#projects" onClick={(e) => { e.preventDefault(); projectsRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-brand-primary py-4 px-10 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl">
                            {t('home.viewAllBtn')}
                        </a>
                    </motion.div>
                </div>
            </section>

            <section className="bg-white py-20 border-b border-gray-100">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                    {[
                        { v: 15, l: t('home.stats.projectsTitle') },
                        { v: 250, l: t('home.stats.rendersTitle') },
                        { v: 10, l: t('home.stats.awardsTitle') }
                    ].map((s, i) => (
                        <div key={i} className="group cursor-default flex flex-col items-center">
                            <Counter target={s.v} />
                            <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-2 font-bold">{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* AI Slider Section */}
            <section className="bg-[#111] text-white py-24 overflow-hidden relative">
                <div className="container mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h4 className="text-brand-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-2">
                            <Wand2 className="w-4 h-4" /> AI CONCEPT ENGINE
                        </h4>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-widest text-white">{t('home.aiTitle')}</h2>
                        <div className="w-20 h-1 bg-brand-primary mx-auto mt-6 mb-6"></div>
                        <p className="max-w-2xl mx-auto text-gray-400 font-light leading-relaxed">
                            {t('home.aiDesc')}
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-5xl mx-auto"
                    >
                        <BeforeAfterSlider 
                            beforeImage="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1200&auto=format&fit=crop" 
                            afterImage="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop" 
                            beforeLabel={t('home.before')}
                            afterLabel={t('home.after')}
                        />
                    </motion.div>
                </div>
            </section>

            <section id="services" className="py-24 bg-white border-b border-gray-50 overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-widest">{t('home.servicesTitle')}</h2>
                        <div className="w-20 h-1 bg-brand-primary mx-auto mt-6"></div>
                    </motion.div>
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
                    <div className="text-center mb-12 animate-fadeIn">
                        <h2 className="text-2xl font-heading font-bold uppercase tracking-widest">{t('home.workflowTitle')}</h2>
                    </div>
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
                                                <span className="text-[9px] font-bold text-brand-primary uppercase tracking-widest leading-none">{stage.pay}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Expert Handbook Highlights */}
            {content.handbook && content.handbook.length > 0 && (
                <section className="py-24 bg-white overflow-hidden border-t border-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div className="w-full md:w-1/2">
                                <h4 className="text-brand-primary font-black text-[11px] uppercase tracking-[0.5em] mb-4">{t('handbook.intellectualProperty')}</h4>
                                <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-widest leading-tight">
                                    {t('header.handbook')}
                                </h2>
                            </div>
                            <div className="w-full md:w-1/2 flex justify-end">
                                <button 
                                    onClick={() => navigate('/handbook')}
                                    className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-brand-primary transition-all flex items-center gap-4 group"
                                >
                                    {t('home.viewAllBtn')} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {content.handbook.slice(0, 3).map((article: any, i: number) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => navigate(`/handbook/${article.id}`)}
                                    className="group cursor-pointer"
                                >
                                    <div className="aspect-[16/11] overflow-hidden rounded-sm mb-8 relative bg-gray-50">
                                        <img src={article.thumbnail} alt="Handbook" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                                        <div className="pt-8 border-t border-gray-50 flex justify-between items-center group/more">
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 group-hover:text-brand-primary transition-colors">
                                                {t('handbook.exploreStory')}
                                            </span>
                                            <ArrowRight className="w-5 h-5 text-gray-200 group-hover:text-brand-primary group-hover:translate-x-2 transition-all" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-4">
                                        <Calendar className="w-3 h-3" /> {article.date}
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-gray-900 group-hover:text-brand-primary transition-colors uppercase tracking-tight leading-tight mb-4 line-clamp-2">
                                        {i18n.language === 'vi' ? article.title_vi : article.title_en}
                                    </h3>
                                    <p className="text-gray-400 text-sm italic font-light line-clamp-2 mb-6">
                                        {i18n.language === 'vi' ? article.excerpt_vi : article.excerpt_en}
                                    </p>
                                    <button 
                                        className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary mb-6 flex items-center gap-2 group/btn"
                                    >
                                        {t('handbook.readMore')} <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                    <div className="w-12 h-0.5 bg-gray-100 group-hover:w-20 group-hover:bg-brand-primary transition-all duration-500"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Home;
