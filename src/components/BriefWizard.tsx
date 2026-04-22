import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Send, Check } from 'lucide-react';

const BriefWizard = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1
        name: '',
        lifestyle: '',
        address: '',
        area: '',
        house_direction: '',
        house_status: '',
        purpose: [] as string[],
        
        // Step 2
        spaces: [] as string[],
        styles: [] as string[],
        plants: [] as string[],
        materials: '',
        
        // Step 3
        guests: '',
        living_room: '',
        kitchen: [] as string[],
        kitchen_fire_dir: '',
        kitchen_water_dir: '',
        dining_needs: [] as string[],
        
        // Step 4
        master_bedroom: [] as string[],
        master_bed_dir: '',
        small_bedroom: [] as string[],
        altar_dir: '',
        garden: [] as string[],
        other_spaces: '',
        
        // Step 5
        old_furniture: '',
        budget: '',
        custom_notes: ''
    });

    const updateForm = (key: string, value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    const toggleArrayItem = (key: string, value: string) => {
        setFormData((prev: any) => {
            const arr = prev[key] || [];
            if (arr.includes(value)) {
                return { ...prev, [key]: arr.filter((i: string) => i !== value) };
            } else {
                return { ...prev, [key]: [...arr, value] };
            }
        });
    };

    const nextStep = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(s => Math.min(s + 1, 6));
    };
    const prevStep = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(s => Math.max(s - 1, 1));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('https://formspree.io/f/xvgzbgzl', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            setStep(6); // Success step
        }).catch(err => console.error("Error submitting form:", err));
    };

    const slideVariants = {
        enter: { x: 50, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 }
    };

    const renderCheckboxGrid = (key: string, options: string[]) => (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {options.map(opt => {
                const isSelected = (formData[key as keyof typeof formData] as string[]).includes(opt);
                return (
                    <button
                        key={opt}
                        onClick={() => toggleArrayItem(key, opt)}
                        className={`text-left p-3 border rounded-sm text-xs font-bold transition-all flex items-center justify-between ${isSelected ? 'border-brand-primary bg-brand-primary/5 text-brand-primary shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
                    >
                        <span>{opt}</span>
                        {isSelected && <Check className="w-4 h-4" />}
                    </button>
                );
            })}
        </div>
    );

    const renderRadioGrid = (key: string, options: string[]) => (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {options.map(opt => {
                const isSelected = formData[key as keyof typeof formData] === opt;
                return (
                    <button
                        key={opt}
                        onClick={() => updateForm(key, opt)}
                        className={`text-center p-3 border rounded-sm text-xs font-bold transition-all ${isSelected ? 'border-brand-primary bg-brand-primary text-white shadow-md' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
                    >
                        {opt}
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-24 flex flex-col items-center font-sans">
            <div className="w-full max-w-4xl px-6">
                
                {/* Progress Bar */}
                {step < 6 && (
                    <div className="mb-16">
                        <div className="flex justify-between mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            <span className={step >= 1 ? 'text-brand-primary' : ''}>Cơ bản</span>
                            <span className="hidden md:inline">-------------</span>
                            <span className={step >= 2 ? 'text-brand-primary' : ''}>Không gian</span>
                            <span className="hidden md:inline">-------------</span>
                            <span className={step >= 3 ? 'text-brand-primary' : ''}>Sinh hoạt</span>
                            <span className="hidden md:inline">-------------</span>
                            <span className={step >= 4 ? 'text-brand-primary' : ''}>Phòng ngủ</span>
                            <span className="hidden md:inline">-------------</span>
                            <span className={step >= 5 ? 'text-brand-primary' : ''}>Ngân sách</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 w-full rounded-full overflow-hidden flex">
                            <motion.div 
                                className="h-full bg-brand-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / 5) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-sm shadow-2xl p-8 md:p-16 relative overflow-hidden min-h-[600px] border border-gray-100">
                    <AnimatePresence mode="wait">
                        {/* BƯỚC 1: THÔNG TIN CƠ BẢN */}
                        {step === 1 && (
                            <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="flex flex-col h-full">
                                <h2 className="text-sm font-black text-brand-primary uppercase tracking-[0.4em] mb-4">01. Thông tin cơ bản</h2>
                                <h3 className="text-3xl md:text-4xl font-heading font-black mb-10 text-gray-900 uppercase tracking-widest leading-tight">Bắt đầu câu chuyện của bạn</h3>
                                
                                <div className="space-y-8 flex-1">
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-3 text-gray-500">Tên của bạn là gì?</label>
                                        <input type="text" value={formData.name} onChange={e => updateForm('name', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-3 transition-colors bg-transparent text-lg font-medium" placeholder="Nhập họ tên của bạn" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-3 text-gray-500">Hãy nói qua phong cách sống hiện tại của bạn</label>
                                        <textarea value={formData.lifestyle} onChange={e => updateForm('lifestyle', e.target.value)} rows={3} className="w-full border-2 border-gray-100 focus:border-brand-primary outline-none p-4 transition-colors bg-gray-50 rounded-sm" placeholder="Chia sẻ về thói quen, công việc hoặc sở thích..." />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[11px] font-black uppercase tracking-widest mb-3 text-gray-500">Địa chỉ ngôi nhà</label>
                                            <input type="text" value={formData.address} onChange={e => updateForm('address', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-3 transition-colors bg-transparent text-base" placeholder="Tỉnh/Thành phố, Quận/Huyện..." />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-black uppercase tracking-widest mb-3 text-gray-500">Diện tích đất / nhà</label>
                                            <input type="text" value={formData.area} onChange={e => updateForm('area', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-3 transition-colors bg-transparent text-base" placeholder="VD: Đất 100m2, Xây dựng 80m2 x 3 tầng" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Hướng chính của căn nhà</label>
                                        {renderRadioGrid('house_direction', ['Bắc', 'Nam', 'Đông', 'Tây', 'Đông Bắc', 'Đông Nam', 'Tây Bắc', 'Tây Nam'])}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Tình trạng ngôi nhà</label>
                                            {renderRadioGrid('house_status', ['Cũ', 'Bàn giao thô', 'Hoàn thiện một phần'])}
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Mục đích sử dụng</label>
                                            {renderCheckboxGrid('purpose', ['Nhà ở', 'Làm văn phòng', 'Cho thuê', 'Hỗn hợp'])}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* BƯỚC 2: KHÔNG GIAN & TIỆN NGHI */}
                        {step === 2 && (
                            <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
                                <h2 className="text-sm font-black text-brand-primary uppercase tracking-[0.4em] mb-4">02. Không gian & Tiện nghi</h2>
                                <h3 className="text-3xl md:text-4xl font-heading font-black mb-10 text-gray-900 uppercase tracking-widest leading-tight">Định hình phong cách</h3>
                                
                                <div className="space-y-10">
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Những không gian nào có trong căn nhà?</label>
                                        {renderCheckboxGrid('spaces', ['Sân vườn', 'Garage', 'Bếp', 'Phòng ăn', 'Phòng khách', 'Thang máy', 'Ban công/Logia', 'Master Bed', 'Phòng trẻ em', 'Người lớn tuổi', 'Thư phòng', 'SH chung', 'Thông tầng', 'Phòng giặt'])}
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Từ nào có thể diễn tả phong cách mong muốn?</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {[
                                                { label: 'Modern Light', value: 'Modern Minimalism - Light' },
                                                { label: 'Modern Dark', value: 'Modern Minimalism - Dark' },
                                                { label: 'Parisian', value: 'Contemporary Parisian' },
                                                { label: 'Wabi-sabi', value: 'Wabi sabi - Japandi' },
                                                { label: 'Industrial', value: 'Industrial Modern' },
                                                { label: 'Farmhouse', value: 'Farmhouse Modern' }
                                            ].map(style => (
                                                <button 
                                                    key={style.value}
                                                    onClick={() => toggleArrayItem('styles', style.value)}
                                                    className={`p-6 border-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all flex flex-col items-center gap-3 ${formData.styles.includes(style.value) ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' : 'border-gray-100 hover:border-gray-300 text-gray-500'}`}
                                                >
                                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${formData.styles.includes(style.value) ? 'border-brand-primary bg-brand-primary text-white' : 'border-gray-300'}`}>
                                                        {formData.styles.includes(style.value) && <Check className="w-4 h-4" />}
                                                    </div>
                                                    <span className="text-center leading-relaxed">{style.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Bạn thích có cây xanh ở đâu?</label>
                                            {renderCheckboxGrid('plants', ['Trong nhà', 'Logia/Ban công', 'Trong phòng'])}
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Tông màu, Vật liệu mong muốn</label>
                                            <input type="text" value={formData.materials} onChange={e => updateForm('materials', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-3 transition-colors bg-transparent text-base" placeholder="Ví dụ: Gỗ óc chó, đá marble, tông trung tính..." />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* BƯỚC 3: SINH HOẠT CHUNG */}
                        {step === 3 && (
                            <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
                                <h2 className="text-sm font-black text-brand-primary uppercase tracking-[0.4em] mb-4">03. Chi tiết Công năng</h2>
                                <h3 className="text-3xl md:text-4xl font-heading font-black mb-10 text-gray-900 uppercase tracking-widest leading-tight">Khu vực Sinh hoạt chung</h3>
                                
                                <div className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Nhu cầu tiếp khách ở nhà?</label>
                                            {renderRadioGrid('guests', ['Không bao giờ', 'Rất ít', 'Nhiều'])}
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Bạn muốn có gì trong phòng khách?</label>
                                            <input type="text" value={formData.living_room} onChange={e => updateForm('living_room', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-3 transition-colors bg-transparent text-base" placeholder="Sofa lớn, kệ tivi, bể cá..." />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Nhu cầu ở khu vực bếp</label>
                                        {renderCheckboxGrid('kitchen', ['Lò vi sóng âm', 'Tủ lạnh đơn', 'Tủ lạnh SBS', 'Bếp từ', 'Hút mùi độc lập', 'Hút mùi âm tủ', 'Máy rửa bát', 'Máy sấy bát', 'Tủ rượu'])}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Hướng bếp lửa (nấu)</label>
                                            {renderRadioGrid('kitchen_fire_dir', ['Bắc', 'Nam', 'Đông', 'Tây', 'Đông Bắc', 'Đông Nam', 'Tây Bắc', 'Tây Nam'])}
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Hướng chậu rửa (nước)</label>
                                            {renderRadioGrid('kitchen_water_dir', ['Bắc', 'Nam', 'Đông', 'Tây', 'Đông Bắc', 'Đông Nam', 'Tây Bắc', 'Tây Nam'])}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Nhu cầu ở phòng ăn</label>
                                        {renderCheckboxGrid('dining_needs', ['Bàn ăn 4 người', 'Bàn ăn 6 người', 'Bàn ăn 8 người'])}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* BƯỚC 4: PHÒNG NGỦ & KHÁC */}
                        {step === 4 && (
                            <motion.div key="step4" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
                                <h2 className="text-sm font-black text-brand-primary uppercase tracking-[0.4em] mb-4">04. Chi tiết Công năng</h2>
                                <h3 className="text-3xl md:text-4xl font-heading font-black mb-10 text-gray-900 uppercase tracking-widest leading-tight">Phòng ngủ & Không gian khác</h3>
                                
                                <div className="space-y-10">
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Nhu cầu ở phòng ngủ chính (Master)</label>
                                        {renderCheckboxGrid('master_bedroom', ['Giường 1.6x2m', 'Giường 1.8x2m', 'Bàn trang điểm', 'Bàn làm việc', 'Xem tivi', 'Tủ quần áo', 'Walk-in closet', 'Ensuite bathroom'])}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Hướng đầu giường phòng ngủ chính</label>
                                            <input type="text" value={formData.master_bed_dir} onChange={e => updateForm('master_bed_dir', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-3 transition-colors bg-transparent text-base" placeholder="Ví dụ: Đông Nam" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Hướng bàn thờ (nếu có)</label>
                                            {renderRadioGrid('altar_dir', ['Bắc', 'Nam', 'Đông', 'Tây'])}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Nhu cầu phòng ngủ nhỏ / trẻ em / người già</label>
                                        {renderCheckboxGrid('small_bedroom', ['Giường tầng', 'Giường 0.9x2m', 'Giường 1.2x2m', 'Giường 1.6x2m'])}
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-gray-500">Sân vườn (nếu có)</label>
                                        {renderCheckboxGrid('garden', ['Lối đi tự nhiên', 'Lối đi gạch', 'Bể cá cảnh', 'Bể tràn resort'])}
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-3 text-gray-500">Nhu cầu ở những không gian khác</label>
                                        <textarea value={formData.other_spaces} onChange={e => updateForm('other_spaces', e.target.value)} rows={2} className="w-full border-2 border-gray-100 focus:border-brand-primary outline-none p-4 transition-colors bg-gray-50 rounded-sm" placeholder="Ví dụ: Phòng gym, kho, hầm rượu..." />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* BƯỚC 5: NGÂN SÁCH */}
                        {step === 5 && (
                            <motion.div key="step5" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
                                <h2 className="text-sm font-black text-brand-primary uppercase tracking-[0.4em] mb-4">05. Tổng kết</h2>
                                <h3 className="text-3xl md:text-4xl font-heading font-black mb-10 text-gray-900 uppercase tracking-widest leading-tight">Ngân sách & Lưu ý riêng</h3>
                                
                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-3 text-gray-500">Đồ đạc cũ nào bạn sẽ đem đến nhà mới?</label>
                                        <textarea value={formData.old_furniture} onChange={e => updateForm('old_furniture', e.target.value)} rows={3} className="w-full border-2 border-gray-100 focus:border-brand-primary outline-none p-4 transition-colors bg-gray-50 rounded-sm" placeholder="Kê khai các món đồ bạn muốn giữ lại..." />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2 text-gray-500">Ngân sách đầu tư dự kiến</label>
                                        <p className="text-xs text-gray-400 mb-4 italic">Hãy cho chúng tôi biết con số gần đúng bạn dự định dành cho sự thay đổi này.</p>
                                        <input type="text" value={formData.budget} onChange={e => updateForm('budget', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-3 transition-colors bg-transparent text-xl font-bold" placeholder="Ví dụ: 500 triệu - 1 tỷ" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-widest mb-3 text-gray-500">Diễn đạt lại mong muốn của bạn bằng ngôn từ riêng</label>
                                        <textarea value={formData.custom_notes} onChange={e => updateForm('custom_notes', e.target.value)} rows={4} className="w-full border-2 border-gray-100 focus:border-brand-primary outline-none p-4 transition-colors bg-gray-50 rounded-sm" placeholder="Ước mơ về không gian sống của bạn là..." />
                                    </div>
                                </div>

                                <div className="mt-16 text-center">
                                    <button onClick={handleSubmit} className="bg-brand-primary text-white px-16 py-5 rounded-sm font-black uppercase tracking-[0.3em] text-sm hover:bg-brand-secondary transition-all shadow-2xl flex items-center justify-center mx-auto gap-4 group">
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/> GỬI YÊU CẦU THIẾT KẾ
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* BƯỚC 6: SUCCESS */}
                        {step === 6 && (
                            <motion.div key="step6" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="text-center py-20">
                                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner border border-green-100">
                                    <Check className="w-12 h-12" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 uppercase tracking-widest text-gray-900">Hoàn tất xuất sắc!</h2>
                                <div className="w-16 h-1 bg-brand-primary mx-auto mb-8"></div>
                                <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
                                    N&M Studio đã nhận được đầy đủ thông tin tâm huyết từ bạn. Đội ngũ Kiến trúc sư sẽ phân tích dữ liệu này và liên hệ lại với bạn trong vòng 24H để hiện thực hóa ước mơ.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                {step < 5 && (
                    <div className="flex justify-between mt-10">
                        <button 
                            onClick={prevStep}
                            disabled={step === 1}
                            className={`flex items-center gap-3 font-black uppercase tracking-[0.3em] text-[11px] px-6 py-4 transition-all ${step === 1 ? 'opacity-0 cursor-default' : 'text-gray-400 hover:text-brand-primary bg-white shadow-sm border border-gray-100 hover:shadow-md'}`}
                        >
                            <ArrowLeft className="w-4 h-4"/> QUAY LẠI
                        </button>
                        <button 
                            onClick={nextStep}
                            className="flex items-center gap-3 font-black uppercase tracking-[0.3em] text-[11px] px-10 py-4 bg-gray-900 text-white rounded-sm hover:bg-brand-primary transition-all shadow-xl group"
                        >
                            TIẾP THEO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BriefWizard;
