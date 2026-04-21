import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ChevronLeft, Share2, Tag, Quote, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface HandbookDetailProps {
    content: any;
}

const HandbookDetail = ({ content }: HandbookDetailProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language;

    const handbookData = content.handbook || [];
    const article = handbookData.find((a: any) => a.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!article) {
        return (
            <div className="pt-40 pb-20 text-center min-h-screen">
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

    return (
        <div className="bg-white min-h-screen font-sans overflow-hidden">
            {/* Hero Section */}
            <header className="relative h-[70vh] w-full overflow-hidden flex items-end">
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={article.thumbnail} 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt={title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="container mx-auto px-6 pb-20 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <button onClick={() => navigate('/handbook')} className="text-white/60 hover:text-brand-primary transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 group">
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t('header.handbook')}
                        </button>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm">{article.category}</span>
                            <span className="text-white/50 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                                <Calendar className="w-3 h-3" /> {article.date}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight uppercase tracking-wide">
                            {title}
                        </h1>
                    </motion.div>
                </div>
            </header>

            {/* Article Content */}
            <main className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Sticky Sidebar */}
                    <aside className="lg:col-span-3 hidden lg:block h-fit sticky top-32">
                        <div className="border-l-2 border-gray-100 pl-8 space-y-12">
                            <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Mô tả tóm tắt</h4>
                                <p className="text-sm text-gray-500 leading-relaxed italic">{excerpt}</p>
                            </div>
                            <div className="pt-8 border-t border-gray-50">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Tác giả</h4>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold">NM</div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">Team Founder</p>
                                        <p className="text-[10px] text-gray-400 font-medium">Expert Insights</p>
                                    </div>
                                </div>
                            </div>
                            <button className="flex items-center gap-3 text-xs font-bold text-brand-primary uppercase tracking-widest hover:text-brand-secondary transition-colors">
                                <Share2 className="w-4 h-4" /> Chia sẻ bài viết
                            </button>
                        </div>
                    </aside>

                    {/* Main Text Content */}
                    <article className="lg:col-span-8 lg:col-start-5 prose prose-lg prose-brand max-w-none">
                        <div className="text-gray-700 leading-loose text-lg font-light space-y-10 whitespace-pre-line">
                            {contentText.split('\n\n').map((paragraph: string, i: number) => {
                                if (paragraph.startsWith('###')) {
                                    return <h3 key={i} className="text-2xl md:text-3xl font-heading font-bold text-gray-900 pt-10 pb-4 uppercase tracking-widest border-b border-gray-100">{paragraph.replace('### ', '')}</h3>;
                                }
                                if (paragraph.startsWith('**')) {
                                    return <div key={i} className="bg-gray-50 p-8 border-l-4 border-brand-primary my-10 shadow-sm relative overflow-hidden group">
                                        <Quote className="absolute -top-4 -right-4 w-24 h-24 text-brand-primary/5 group-hover:scale-110 transition-transform" />
                                        <p className="relative z-10 text-gray-900 font-bold m-0">{paragraph.replace(/\*\*/g, '')}</p>
                                    </div>;
                                }
                                if (paragraph.startsWith('-')) {
                                    return (
                                        <ul key={i} className="space-y-4 my-8 list-none p-0">
                                            {paragraph.split('\n').map((item, idx) => (
                                                <li key={idx} className="flex gap-4 items-start text-sm md:text-base">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                                                    <span className="text-gray-600">{item.replace('- ', '')}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                }
                                return <p key={i} className="text-gray-600 tracking-wide text-base md:text-lg">{paragraph}</p>;
                            })}
                        </div>

                        {/* Recommendation Banner */}
                        <div className="mt-24 bg-brand-secondary/5 p-12 rounded-sm border border-brand-secondary/10 flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-1">
                                <div className="flex items-center gap-4 text-brand-primary mb-4">
                                    <Info className="w-6 h-6" />
                                    <h4 className="text-xl font-heading font-bold uppercase tracking-widest">{currentLang === 'vi' ? 'Bạn đang ấp ủ một dự án?' : 'Planning a project?'}</h4>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {currentLang === 'vi' 
                                        ? 'Những kiến thức trên chỉ là một phần nhỏ trong quy trình làm việc chuyên nghiệp tại NM Studio. Hãy bắt đầu bản Thiết kế Brief ngay hôm nay để nhận được sự tư vấn chuyên sâu nhất.'
                                        : 'These insights are just a small part of the professional workflow at NM Studio. Start your Design Brief today for in-depth consultation.'}
                                </p>
                            </div>
                            <button onClick={() => navigate('/brief')} className="bg-brand-primary text-white py-4 px-10 font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-secondary transition-all shadow-xl whitespace-nowrap">
                                {t('header.briefButton')}
                            </button>
                        </div>
                    </article>
                </div>
            </main>
        </div>
    );
};

export default HandbookDetail;
