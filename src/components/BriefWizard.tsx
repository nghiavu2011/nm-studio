import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Send } from 'lucide-react';

const BriefWizard = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        style: '',
        area: '',
        budget: '',
        notes: ''
    });

    const updateForm = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Fallback Formspree URL or custom endpoint
        fetch('https://formspree.io/f/xvgzbgzl', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json'
            }
        }).then(() => {
            setStep(5); // Success step
        });
    };

    const slideVariants = {
        enter: { x: 50, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F3] pt-24 pb-12 flex flex-col justify-center items-center font-sans text-brand-secondary">
            <div className="w-full max-w-3xl px-6">
                
                {/* Progress Bar */}
                {step < 5 && (
                    <div className="mb-12">
                        <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-widest text-brand-primary">
                            <span>Thông tin cơ bản</span>
                            <span>Phong cách</span>
                            <span>Ngân sách</span>
                            <span>Hoàn tất</span>
                        </div>
                        <div className="h-1 bg-gray-200 w-full rounded overflow-hidden flex">
                            <motion.div 
                                className="h-full bg-brand-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / 4) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-sm shadow-xl p-8 md:p-12 relative overflow-hidden min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="flex flex-col h-full justify-center">
                                <h2 className="text-3xl font-heading font-bold mb-2">Chào bạn! Chúng ta bắt đầu nhé.</h2>
                                <p className="text-gray-500 mb-8 font-light">Hãy cho N&M Studio biết một vài thông tin cơ bản về bạn và dự án.</p>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest mb-2">Tên của bạn</label>
                                        <input type="text" value={formData.name} onChange={e => updateForm('name', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 transition-colors bg-transparent" placeholder="Nguyễn Văn A" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest mb-2">Số điện thoại</label>
                                        <input type="tel" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 transition-colors bg-transparent" placeholder="090..." />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest mb-2">Diện tích đất / nhà (m2)</label>
                                        <input type="text" value={formData.area} onChange={e => updateForm('area', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 transition-colors bg-transparent" placeholder="VD: 100m2 x 3 tầng" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
                                <h2 className="text-3xl font-heading font-bold mb-2">Đâu là phong cách bạn yêu thích?</h2>
                                <p className="text-gray-500 mb-8 font-light">Sự lựa chọn này giúp AI của chúng tôi gợi ý ý tưởng chính xác hơn.</p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {['Modern Light', 'Modern Dark', 'Parisian', 'Japandi / Wabi Sabi', 'Industrial', 'Farmhouse '].map(style => (
                                        <button 
                                            key={style}
                                            onClick={() => updateForm('style', style)}
                                            className={`p-4 border-2 rounded-sm text-sm font-bold uppercase tracking-wider transition-all ${formData.style === style ? 'border-brand-primary bg-brand-primary text-white scale-105 shadow-lg' : 'border-gray-100 hover:border-gray-300 text-gray-500'}`}
                                        >
                                            {style}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
                                <h2 className="text-3xl font-heading font-bold mb-2">Ngân sách dự kiến & Ghi chú</h2>
                                <p className="text-gray-500 mb-8 font-light">Giúp chúng tôi tối ưu vật liệu và giải pháp thiết kế cho bạn.</p>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest mb-2">Ngân sách dự kiến</label>
                                        <select value={formData.budget} onChange={e => updateForm('budget', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 transition-colors bg-transparent uppercase text-sm tracking-wider font-bold">
                                            <option value="">-- Chọn ngân sách --</option>
                                            <option value="Dưới 500 Triệu">Dưới 500 Triệu</option>
                                            <option value="500 Triệu - 1 Tỷ">500 Triệu - 1 Tỷ</option>
                                            <option value="1 Tỷ - 3 Tỷ">1 Tỷ - 3 Tỷ</option>
                                            <option value="Trên 3 Tỷ">Trên 3 Tỷ</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest mb-2">Bạn có mong muốn đặc biệt nào không?</label>
                                        <textarea value={formData.notes} onChange={e => updateForm('notes', e.target.value)} rows={4} className="w-full border-2 border-gray-200 focus:border-brand-primary outline-none p-3 transition-colors bg-transparent rounded-sm" placeholder="Ví dụ: Mong muốn có không gian thiền, phòng xem phim,..." />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div key="step4" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="text-center py-8">
                                <h2 className="text-4xl font-heading font-bold mb-6 text-brand-primary">Gần xong rồi!</h2>
                                <p className="text-gray-600 mb-8 text-lg">Bạn đã sẵn sàng gửi đi những mong ước cho tổ ấm của mình chưa?</p>
                                <button onClick={handleSubmit} className="bg-brand-primary text-white px-12 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-brand-secondary transition-all shadow-xl flex items-center justify-center mx-auto gap-3">
                                    <Send className="w-5 h-5"/> GỬI YÊU CẦU
                                </button>
                            </motion.div>
                        )}

                        {step === 5 && (
                            <motion.div key="step5" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-10 h-10 stroke-current"><path d="M20 6L9 17l-5-5"></path></svg>
                                </div>
                                <h2 className="text-4xl font-heading font-bold mb-4">Hoàn tất xuất sắc!</h2>
                                <p className="text-gray-600">N&M Studio đã nhận được thông tin. Đội ngũ Kiến trúc sư và AI của chúng tôi sẽ phân tích và liên hệ lại với bạn trong vòng 24H.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                {step < 4 && (
                    <div className="flex justify-between mt-8">
                        <button 
                            onClick={prevStep}
                            disabled={step === 1}
                            className={`flex items-center gap-2 font-bold uppercase tracking-widest text-xs px-6 py-3 transition-all ${step === 1 ? 'opacity-0 cursor-default' : 'text-gray-500 hover:text-brand-primary'}`}
                        >
                            <ArrowLeft className="w-4 h-4"/> QUAY LẠI
                        </button>
                        <button 
                            onClick={nextStep}
                            className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs px-6 py-3 bg-brand-primary text-white rounded-sm hover:scale-105 transition-all shadow-md"
                        >
                            TIẾP TỤC <ArrowRight className="w-4 h-4"/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BriefWizard;
