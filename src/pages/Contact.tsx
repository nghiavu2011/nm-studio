import React from 'react';
import { Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-24 min-h-screen bg-[#111] animate-fadeIn">
            {/* Hero Header */}
            <div className="py-20 text-center px-6">
                <h4 className="text-brand-primary font-bold text-[10px] uppercase tracking-[0.5em] mb-4">CONTACT US</h4>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-widest mb-6">Liên Hệ / Nhận Tư Vấn</h1>
                <div className="w-16 h-1 bg-brand-primary mx-auto"></div>
            </div>

            <div className="container mx-auto px-6 pb-24">
                <div className="max-w-4xl mx-auto bg-[#1a1a1a] p-8 md:p-12 border border-white/5 shadow-2xl rounded-sm">
                    <form id="nm-contact" className="space-y-10">
                        {/* Row 1: First/Last Name */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tên (bắt buộc)</label>
                                <input name="firstName" required placeholder="Tên" className="w-full bg-[#111] border border-white/10 p-4 text-xs text-white focus:border-brand-primary outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Họ (bắt buộc)</label>
                                <input name="lastName" required placeholder="Họ" className="w-full bg-[#111] border border-white/10 p-4 text-xs text-white focus:border-brand-primary outline-none transition-all" />
                            </div>
                        </div>

                        {/* Row 2: Email & Phone */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email (bắt buộc)</label>
                                <input type="email" name="email" required placeholder="example@email.com" className="w-full bg-[#111] border border-white/10 p-4 text-xs text-white focus:border-brand-primary outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Điện thoại (bắt buộc)</label>
                                <input name="phone" required placeholder="09xx xxx xxx" className="w-full bg-[#111] border border-white/10 p-4 text-xs text-white focus:border-brand-primary outline-none transition-all" />
                            </div>
                        </div>

                        {/* Row 3: Project Type */}
                        <div className="space-y-4">
                            <legend className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loại dự án (bắt buộc – chọn nhiều)</legend>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {['Công trình mới', 'Cải tạo / nâng cấp', 'Nội thất', 'Kiến trúc', 'Thương mại / Văn phòng / Dịch vụ', 'Khác'].map(type => (
                                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" name="projectTypes" value={type} className="w-4 h-4 accent-brand-primary" />
                                        <span className="text-[11px] text-gray-400 group-hover:text-white transition-colors">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Row 4: Interested Services */}
                        <div className="space-y-4">
                            <legend className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dịch vụ quan tâm (bắt buộc – chọn nhiều)</legend>
                            <div className="space-y-3">
                                {[
                                    'Design – Thiết kế kiến trúc / nội thất',
                                    'Build – Thi công hoàn thiện nội thất',
                                    'Visualization (CGI) – Diễn hoạ kiến trúc / nội thất',
                                    'AI – Diễn hoạ nhanh & concept',
                                    'AI Creative – Logo / Website / Đồ hoạ / Truyền thông',
                                    'Chưa xác định – cần tư vấn'
                                ].map(service => (
                                    <label key={service} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" name="services" value={service} className="w-4 h-4 accent-brand-primary" />
                                        <span className="text-[11px] text-gray-400 group-hover:text-white transition-colors">{service}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Row 5: Location */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vị trí dự án</label>
                            <input name="location" placeholder="Quận / Thành phố / Tỉnh" className="w-full bg-[#111] border border-white/10 p-4 text-xs text-white focus:border-brand-primary outline-none transition-all" />
                        </div>

                        {/* Row 6: Scope */}
                        <div className="space-y-4">
                            <legend className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phạm vi mong muốn (chọn nhiều)</legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    'Tư vấn định hướng ban đầu',
                                    'Thiết kế concept',
                                    'Thiết kế chi tiết kỹ thuật',
                                    'Thi công trọn gói',
                                    'Diễn hoạ thuyết trình / marketing',
                                    'Ứng dụng AI để lên ý tưởng nhanh'
                                ].map(item => (
                                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" name="scope" value={item} className="w-4 h-4 accent-brand-primary" />
                                        <span className="text-[11px] text-gray-400 group-hover:text-white transition-colors">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Row 7: Timeline & Budget */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Thời gian dự kiến</label>
                                <select name="timeline" className="w-full bg-[#111] border border-white/10 p-4 text-xs text-white focus:border-brand-primary outline-none transition-all appearance-none">
                                    <option value="">Chọn</option>
                                    <option>Ngay</option>
                                    <option>Trong 1–3 tháng</option>
                                    <option>Trong 3–6 tháng</option>
                                    <option>Chưa xác định</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ngân sách dự kiến</label>
                                <select name="budget" className="w-full bg-[#111] border border-white/10 p-4 text-xs text-white focus:border-brand-primary outline-none transition-all appearance-none">
                                    <option value="">Chọn</option>
                                    <option>Dưới 500 triệu</option>
                                    <option>500 triệu – 1 tỷ</option>
                                    <option>1 – 3 tỷ</option>
                                    <option>Trên 3 tỷ</option>
                                    <option>Chưa xác định / muốn tư vấn</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 8: Message */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hãy cho chúng tôi biết thêm về dự án của bạn (bắt buộc)</label>
                            <p className="text-[9px] text-gray-500 uppercase italic mb-2 tracking-widest">Gợi ý: Loại công trình, diện tích, tình trạng hiện tại, phong cách mong muốn...</p>
                            <textarea name="message" required rows={6} placeholder="Ví dụ: Căn hộ 85m2, cần thiết kế nội thất theo phong cách hiện đại..." className="w-full bg-[#111] border border-white/10 p-4 text-xs text-white focus:border-brand-primary outline-none transition-all resize-none"></textarea>
                        </div>

                        {/* Submit */}
                        <div className="text-center space-y-4">
                            <button type="submit" className="bg-[#D49910] hover:bg-[#B3800D] text-black font-bold uppercase tracking-[0.3em] px-12 py-5 text-sm transition-all shadow-xl rounded-sm active:scale-95 flex items-center gap-4 mx-auto">
                                Nộp / Send <Send className="w-4 h-4" />
                            </button>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest opacity-75">NM Studio sẽ liên hệ lại trong 24–48 giờ làm việc.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
