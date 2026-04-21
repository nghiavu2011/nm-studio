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
            <section className="bg-white border-b border-gray-100 py-20">
                <div className="container mx-auto px-6 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h4 className="text-brand-primary font-black text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6">Expert Perspectives</h4>
                        <h1 className="text-5xl md:text-7xl font-heading font-black text-gray-900 mb-8 uppercase tracking-widest leading-tight">
                            {currentLang === 'vi' ? 'Cẩm Nang NM' : 'NM Handbook'}
                        </h1>
                        <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto uppercase tracking-widest">
                            {currentLang === 'vi' 
                                ? 'Đúc rút kinh nghiệm "xương máu" về quy trình thiết kế, thi công & phong thủy từ thực tế.'
                                : 'Distilling essential insights on design, construction, and scientific feng shui.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Article */}
            {featuredArticle && !searchTerm && activeCategory === 'All' && (
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-6">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => navigate(`/handbook/${featuredArticle.id}`)}
                            className="relative h-[600px] group cursor-pointer overflow-hidden rounded-sm shadow-2xl"
                        >
                            <img src={featuredArticle.thumbnail} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" alt="Featured" />
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
                            <div className="absolute inset-x-0 bottom-0 p-10 md:p-20 flex flex-col justify-end">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-sm">FEATURED</span>
                                    <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">{featuredArticle.category} • {featuredArticle.date}</span>
                                </div>
                                <h2 className="text-3xl md:text-6xl font-heading font-bold text-white mb-8 group-hover:text-brand-primary transition-colors max-w-5xl uppercase tracking-wide">
                                    {currentLang === 'vi' ? featuredArticle.title_vi : featuredArticle.title_en}
                                </h2>
                                <p className="text-white/60 text-sm md:text-lg mb-10 max-w-3xl font-light italic">
                                    {currentLang === 'vi' ? featuredArticle.excerpt_vi : featuredArticle.excerpt_en}
                                </p>
                                <button className="text-white text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-4 group/btn">
                                    READ MORE <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
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
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        onClick={() => navigate(`/handbook/${article.id}`)}
                                        className="group cursor-pointer flex flex-col h-full"
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden mb-8 shadow-lg bg-gray-100">
                                            <img src={article.thumbnail} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt="Post" />
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur py-1 px-3 rounded-sm">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary">{article.category}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                                            <Calendar className="w-3 h-3" /> {article.date}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-heading font-black text-gray-900 group-hover:text-brand-primary transition-colors uppercase tracking-wide leading-tight mb-4 flex-1">
                                            {currentLang === 'vi' ? article.title_vi : article.title_en}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-light">
                                            {currentLang === 'vi' ? article.excerpt_vi : article.excerpt_en}
                                        </p>
                                        <div className="pt-6 border-t border-gray-50">
                                            <button className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2 group-hover:text-brand-primary transition-colors">
                                                VIEW ARTICLE <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.article>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center flex flex-col items-center">
                                    <Tag className="w-12 h-12 text-gray-100 mb-6" />
                                    <p className="text-xs uppercase font-bold tracking-widest text-gray-300">Không tìm thấy bài viết phù hợp.</p>
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
