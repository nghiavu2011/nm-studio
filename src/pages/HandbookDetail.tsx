import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ChevronLeft, Share2, Tag, Quote, Info, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useSpring } from 'framer-motion';

interface HandbookDetailProps {
    content: any;
}

const HandbookDetail = ({ content }: HandbookDetailProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language;

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const handbookData = content.handbook || [];
    const article = handbookData.find((a: any) => a.id === id);
    const relatedArticles = handbookData
        .filter((a: any) => a.id !== id && a.category === article?.category)
        .slice(0, 2);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!article) {
        return (
            <div className="pt-40 pb-20 text-center min-h-screen font-sans">
                <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-400">Bài viết không tồn tại</h2>
                <button onClick={() => navigate('/handbook')} className="mt-8 text-brand-primary font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 mx-auto">
                    <ChevronLeft className="w-4 h-4" /> Quay lại Cẩm Nang
                </button>
            </div>
        );
    }

    const title = currentLang === 'vi' ? article.title_vi : article.title_en;
    const contentText = currentLang === 'vi' ? article.content_vi : article.content_en;
    const excerpt = currentLang === 'vi' ? article.excerpt_vi : article.excerpt_en;

    const renderContent = (text: string) => {
        const paragraphs = text.split('\n\n');
        return paragraphs.map((paragraph, i) => {
            // Handle Images: [IMG:url|caption]
            if (paragraph.startsWith('[IMG:')) {
                const parts = paragraph.replace('[IMG:', '').replace(']', '').split('|');
                const url = parts[0];
                const caption = parts[1] || '';
                return (
                    <figure key={i} className="my-20 group">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-sm bg-gray-100 aspect-video shadow-2xl"
                        >
                            <img src={url} alt={caption} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        </motion.div>
                        {caption && (
                            <figcaption className="mt-6 text-center">
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 border-b border-gray-100 pb-2 italic inline-block">
                                    {caption}
                                </span>
                            </figcaption>
                        )}
                    </figure>
                );
            }

            // Handle Headings: ###
            if (paragraph.startsWith('###')) {
                return (
                    <h3 key={i} className="text-2xl md:text-3xl font-heading font-black text-gray-900 pt-20 pb-8 uppercase tracking-widest border-b border-gray-100 mb-12">
                        {paragraph.replace('### ', '')}
                    </h3>
                );
            }

            // Handle Quotes: **
            if (paragraph.startsWith('**')) {
                return (
                    <div key={i} className="bg-gray-50/80 p-12 md:p-16 border-l-8 border-brand-primary my-20 shadow-sm relative overflow-hidden group rounded-r-sm">
                        <Quote className="absolute -top-6 -right-6 w-32 h-32 text-brand-primary/5 group-hover:scale-110 transition-transform" />
                        <p className="relative z-10 text-gray-900 font-medium m-0 text-xl md:text-2xl leading-relaxed italic">
                            {paragraph.replace(/\*\*/g, '')}
                        </p>
                    </div>
                );
            }

            // Handle Lists: -
            if (paragraph.startsWith('-')) {
                return (
                    <ul key={i} className="space-y-6 my-12 list-none p-0">
                        {paragraph.split('\n').filter(line => line.trim()).map((item, idx) => (
                            <li key={idx} className="flex gap-6 items-start">
                                <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600 font-sans leading-relaxed text-base md:text-lg">
                                    {item.replace('- ', '').trim()}
                                </span>
                            </li>
                        ))}
                    </ul>
                );
            }

            // Default Paragraph
            const isFirstParagraph = i === 0 || (i === 1 && text.startsWith('[IMG:')); // Usually the first paragraph is index 0
            return (
                <p key={i} className={`text-gray-800 font-sans tracking-tight text-lg md:text-xl leading-[2] mb-12 font-light ${isFirstParagraph ? 'first-letter:text-7xl first-letter:font-heading first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:text-brand-primary first-letter:mt-2' : ''}`}>
                    {paragraph}
                </p>
            );
        });
    };

    return (
        <div className="bg-white min-h-screen font-sans overflow-hidden">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[60] origin-left"
                style={{ scaleX }}
            />

            {/* Minimal Header Nav */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-50">
                <div className="container mx-auto px-6 py-5 flex justify-between items-center">
                    <button onClick={() => navigate('/handbook')} className="text-gray-400 hover:text-brand-primary transition-colors flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em]">
                        <ChevronLeft className="w-4 h-4" /> {t('handbook.backToList')}
                    </button>
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{article.category}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/20"></div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{article.date}</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <header className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-end">
                <motion.img 
                    initial={{ scale: 1.1, filter: 'grayscale(100%)' }}
                    animate={{ scale: 1, filter: 'grayscale(0%)' }}
                    transition={{ duration: 1.5 }}
                    src={article.thumbnail} 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt={title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                <div className="container mx-auto px-6 pb-20 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-4xl md:text-7xl font-heading font-black text-white leading-[1.1] uppercase tracking-widest mb-10 drop-shadow-2xl">
                            {title}
                        </h1>
                        <p className="text-white/80 text-base md:text-xl font-light leading-relaxed max-w-3xl italic tracking-wider">
                            {excerpt}
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-32">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-xl max-w-none prose-headings:font-heading prose-p:font-light">
                        {renderContent(contentText)}
                    </div>

                    {/* Expert Footer */}
                    <footer className="mt-32 pt-20 border-t border-gray-100">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-gray-50/80 p-12 md:p-16 rounded-sm border border-gray-100 shadow-inner">
                            <div className="flex items-center gap-10">
                                <div className="w-24 h-24 rounded-full bg-brand-primary p-1 shadow-2xl overflow-hidden">
                                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-brand-primary font-black text-2xl">NM</div>
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-brand-primary uppercase tracking-[0.5em] mb-3">Editor-in-Chief</p>
                                    <h4 className="text-2xl font-heading font-bold text-gray-900 mb-2">N&M Design Team</h4>
                                    <p className="text-sm text-gray-500 italic leading-relaxed">Distilling decade of architecture & interior blood-sweat experience.</p>
                                </div>
                            </div>
                            <button onClick={() => navigate('/brief')} className="bg-brand-primary text-white py-6 px-12 font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-brand-secondary transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0 text-center">
                                {t('header.briefButton')}
                            </button>
                        </div>
                    </footer>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <section className="mt-40">
                            <div className="flex items-center gap-6 mb-16">
                                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 whitespace-nowrap">{t('handbook.keepReading')}</h3>
                                <div className="h-[1px] w-full bg-gray-100"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                {relatedArticles.map((rel: any) => (
                                    <div 
                                        key={rel.id} 
                                        onClick={() => navigate(`/handbook/${rel.id}`)}
                                        className="group cursor-pointer"
                                    >
                                        <div className="aspect-video overflow-hidden rounded-sm mb-8 relative">
                                            <img src={rel.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="Related" />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                        </div>
                                        <h4 className="text-2xl font-heading font-bold text-gray-900 group-hover:text-brand-primary transition-colors leading-tight mb-4 uppercase tracking-wide">
                                            {currentLang === 'vi' ? rel.title_vi : rel.title_en}
                                        </h4>
                                        <p className="text-gray-500 text-sm font-light italic flex items-center gap-3">
                                            {t('handbook.readArticle')} <ArrowRight className="w-4 h-4" />
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

export default HandbookDetail;
