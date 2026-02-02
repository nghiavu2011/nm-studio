import React from 'react';

const About = () => {
    return (
        <div className="pt-24 min-h-screen bg-[#e0ddd2] flex flex-col lg:flex-row animate-fadeIn">
            <div className="w-full lg:w-1/2 px-8 lg:px-24 py-16 flex flex-col justify-center">
                <h4 className="text-brand-primary font-bold text-xs uppercase tracking-[0.4em] mb-6">GIỚI THIỆU</h4>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-10 text-brand-secondary leading-tight uppercase">
                    Về NM Studio
                </h1>
                <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base font-light">
                    <p>NM Studio là đơn vị hoạt động trong lĩnh vực thiết kế kiến trúc – nội thất, thi công hoàn thiện và diễn hoạ không gian, với hơn 15 năm kinh nghiệm trong ngành.</p>
                    <p>Thành lập từ năm 2007, NM Studio khởi đầu với các dự án thiết kế nhà ở, biệt thự và tham gia diễn hoạ kiến trúc – nội thất cho nhiều công ty thiết kế trong và ngoài nước.</p>
                </div>
                <div className="mt-12">
                    <div className="w-20 h-1 bg-brand-primary"></div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 min-h-[500px] lg:min-h-0 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    alt="Studio View"
                />
            </div>
        </div>
    );
};

export default About;
