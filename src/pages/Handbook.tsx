import React, { useState } from 'react';
import { Calendar, ArrowRight, Tag, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface HandbookProps {
    content: any;
}

const Handbook = ({ content }: HandbookProps) => {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const currentLang = i18n.language;
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const handbookData = content.handbook || [];
    
    // Extract unique categories
    const categories = ['All', ...new Set(handbookData.map((a: any) => a.category))];

    const filteredArticles = handbookData.filter((article: any) => {
        const matchesSearch = (currentLang === 'vi' ? article.title_vi : article.title_en)
            .toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredArticle = handbookData.find((a: any) => a.featured);

    return (
        <div className="pt-24 min-h-screen bg-[#FDFDFD] font-sans">
            {/* Header Content */}
            <section className="bg-white border-b border-gray-50 py-24 md:py-32">
                <div className="container mx-auto px-6 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h4 className="text-brand-primary font-black text-[11px] md:text-sm uppercase tracking-[0.6em] mb-8">Expert Perspectives</h4>
                        <h1 className="text-5xl md:text-8xl font-heading font-black text-gray-900 mb-10 uppercase tracking-widest leading-[0.95]">
                            {currentLang === 'vi' ? 'Cẩm Nang NM' : 'NM Handbook'}
                        </h1>
                        <p className="text-gray-400 font-normal text-xs md:text-sm leading-relaxed max-w-2xl mx-auto uppercase tracking-[0.3em]">
                            {currentLang === 'vi' 
                                ? 'Đúc rút kinh nghiệm "xương máu" về quy trình thiết kế, thi công & phong thủy từ thực tế.'
                                : 'Distilling essential insights on design, construction, and scientific feng shui.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Article */}
            {featuredArticle && !searchTerm && activeCategory === 'All' && (
                <section className="py-20 bg-white shadow-sm relative overflow-hidden">
                    <div className="container mx-auto px-6">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.99 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => navigate(`/handbook/${featuredArticle.id}`)}
                            className="relative h-[650px] group cursor-pointer overflow-hidden rounded-sm"
                        >
                            <img src={featuredArticle.thumbnail} className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-110" alt="Featured" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent"></div>
                            <div className="absolute inset-x-0 bottom-0 p-12 md:p-24 flex flex-col justify-end">
                                <div className="flex items-center gap-6 mb-8">
                                    <span className="bg-brand-primary text-white text-[11px] font-black uppercase tracking-[0.4em] px-6 py-2 rounded-sm shadow-xl">FEATURED</span>
                                    <span className="text-white/70 text-[11px] font-bold uppercase tracking-[0.3em]">{featuredArticle.category} • {featuredArticle.date}</span>
                                </div>
                                <h2 className="text-4xl md:text-7xl font-heading font-black text-white mb-10 group-hover:text-brand-primary transition-colors max-w-5xl uppercase tracking-tighter leading-[0.95]">
                                    {currentLang === 'vi' ? featuredArticle.title_vi : featuredArticle.title_en}
                                </h2>
                                <p className="text-white/50 text-sm md:text-xl mb-12 max-w-3xl font-normal italic leading-relaxed">
                                    {currentLang === 'vi' ? featuredArticle.excerpt_vi : featuredArticle.excerpt_en}
                                </p>
                                <button className="text-white text-xs font-bold uppercase tracking-[0.5em] flex items-center gap-6 group/btn w-fit">
                                    <span className="border-b-2 border-brand-primary/0 group-hover/btn:border-brand-primary transition-all pb-1">READ FULL PERSPECTIVE</span> <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-3 transition-transform text-brand-primary" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Tools & Filtering */}
            <section className="sticky top-20 z-40 bg-[#FDFDFD]/90 backdrop-blur-md border-y border-gray-100 py-6">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm ${activeCategory === cat ? 'bg-brand-primary text-white shadow-xl rotate-1' : 'text-gray-400 hover:text-brand-primary'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder={currentLang === 'vi' ? 'Tìm bài viết...' : 'Search articles...'}
                            className="w-full bg-white border border-gray-100 py-3 pl-12 pr-6 text-xs outline-none focus:border-brand-primary transition-colors shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                        <AnimatePresence mode="popLayout">
                            {filteredArticles.length > 0 ? (
                                filteredArticles.map((article: any, index: number) => (
                                    <motion.article 
                                        key={article.id}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        onClick={() => navigate(`/handbook/${article.id}`)}
                                        className="group cursor-pointer flex flex-col h-full bg-white p-6 md:p-8 rounded-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-50"
                                    >
                                        <div className="relative aspect-[16/11] overflow-hidden mb-10 bg-gray-50 rounded-sm">
                                            <img src={article.thumbnail} className="w-full h-full object-cover grayscale transition-all duration-[1.2s] group-hover:grayscale-0 group-hover:scale-110" alt="Post" />
                                            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-xl py-2 px-4 shadow-sm">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">{article.category}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-6">
                                            <Calendar className="w-4 h-4 text-brand-primary/40" /> {article.date}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-heading font-black text-gray-900 group-hover:text-brand-primary transition-colors uppercase tracking-tight leading-[1.1] mb-6 flex-1">
                                            {currentLang === 'vi' ? article.title_vi : article.title_en}
                                        </h3>
                                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 line-clamp-3 font-normal opacity-80 italic">
                                            {currentLang === 'vi' ? article.excerpt_vi : article.excerpt_en}
                                        </p>
                                        <div className="pt-8 border-t border-gray-50 flex justify-between items-center group/more">
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 group-hover:text-brand-primary transition-colors">
                                                {t('handbook.exploreStory')}
                                            </span>
                                            <ArrowRight className="w-5 h-5 text-gray-200 group-hover:text-brand-primary group-hover:translate-x-2 transition-all" />
                                        </div>
                                    </motion.article>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center flex flex-col items-center">
                                    <Tag className="w-12 h-12 text-gray-100 mb-6" />
                                    <p className="text-xs uppercase font-bold tracking-widest text-gray-300">{t('handbook.noResults')}</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Handbook;
