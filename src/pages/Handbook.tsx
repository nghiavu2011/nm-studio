import React from 'react';
import { Calendar } from 'lucide-react';

const Handbook = () => {
    return (
        <div className="pt-24 min-h-screen bg-white animate-fadeIn">
            <div className="h-[60vh] relative overflow-hidden flex items-center justify-center text-center">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover grayscale opacity-20" alt="Blog BG" />
                <div className="relative z-10 px-6 max-w-4xl">
                    <h4 className="text-brand-primary font-bold text-xs uppercase tracking-[0.5em] mb-6">KIẾN THỨC CHUYÊN NGÀNH</h4>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-gray-900 mb-8 uppercase tracking-widest">Cẩm Nang NM Studio</h1>
                    <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                        Chia sẻ kinh nghiệm thực tế trong thiết kế, thi công và quản lý dự án xây dựng từ đội ngũ 15 năm kinh nghiệm.
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto space-y-24">
                    <article className="prose prose-brand max-w-none">
                        <div className="flex items-center gap-4 mb-10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> 24 Tháng 05, 2024</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className="text-brand-primary">Kiến trúc & Kỹ thuật</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8 uppercase tracking-wide leading-snug">
                            Lựa chọn phong cách kiến trúc: Cần hiểu đúng để tránh lãng phí và hối tiếc
                        </h2>
                        <div className="text-sm md:text-base text-gray-600 font-light leading-relaxed space-y-8">
                            <p><strong>1. Mở bài:</strong> Trong hơn 15 năm tham gia tư vấn và thi công, chúng tôi nhận thấy một sai lầm phổ biến của nhiều chủ đầu tư...</p>
                            <h3 className="text-xl font-bold text-gray-800 uppercase tracking-widest mt-12 border-l-4 border-brand-primary pl-4">2. Giải thích khái niệm</h3>
                            <p>Phong cách kiến trúc không chỉ là "cái vỏ" bên ngoài của ngôi nhà...</p>
                            <div className="mt-20 pt-10 border-t border-gray-100 italic text-gray-400 text-sm text-center">
                                “Việc hiểu đúng về lựa chọn phong cách kiến trúc sẽ giúp chủ đầu tư hạn chế rủi ro và phát sinh không cần thiết trong quá trình thiết kế – thi công. Nếu cần tư vấn cụ thể cho dự án của mình, bạn có thể trao đổi thêm với NM Studio.”
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default Handbook;
