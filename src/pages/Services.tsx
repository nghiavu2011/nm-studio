import React from 'react';
import { SERVICES_BRIEF } from '../constants';

const Services = () => {
    return (
        <div className="pt-24 min-h-screen bg-[#f4f1ea] animate-fadeIn">
            <div className="container mx-auto px-6 py-16 text-center max-w-4xl">
                <h4 className="text-brand-primary font-bold text-xs uppercase tracking-[0.4em] mb-6">GIẢI PHÁP TOÀN DIỆN</h4>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-brand-secondary uppercase tracking-widest">
                    DỊCH VỤ – NM STUDIO
                </h1>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light mb-12">
                    NM Studio cung cấp hệ sinh thái dịch vụ toàn diện, đáp ứng trọn vẹn nhu cầu từ ý tưởng đến triển khai cho dự án của bạn.
                </p>
                <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
            </div>
            <div className="container mx-auto px-6 pb-24 grid md:grid-cols-2 gap-16 items-center">
                {SERVICES_BRIEF.map((s, i) => (
                    <div key={i} className="group relative overflow-hidden h-[400px] shadow-xl">
                        <img src={s.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={s.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                            <div className="text-brand-primary mb-4">{s.icon}</div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-widest">{s.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
