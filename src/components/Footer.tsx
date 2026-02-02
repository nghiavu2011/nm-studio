import React from 'react';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleScrollProjects = (e: React.MouseEvent) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: 'projects' } });
        } else {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavigate = (e: React.MouseEvent, path: string) => {
        e.preventDefault();
        navigate(path);
        window.scrollTo(0, 0);
    };

    return (
        <footer className="bg-[#705d3f] text-white pt-24 pb-12">
            <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-16 md:gap-24">
                {/* Column 1: Studio Bio */}
                <div className="space-y-10">
                    <div className="flex items-center gap-3">
                        <img src="https://lh3.googleusercontent.com/d/18wUo0JZ3MWDLKqjRqFsS6PB5jDbZYNsA" className="h-10 brightness-0 invert" alt="Logo" />
                        <div className="text-sm font-heading font-bold tracking-[0.2em] uppercase">N&M Studio</div>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed font-light uppercase tracking-widest max-w-sm">
                        NM Studio cung cấp giải pháp không gian toàn diện, từ thiết kế, diễn hoạ đến thi công và ứng dụng AI, được triển khai đồng bộ và phù hợp với nhu cầu thực tế.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#705d3f] transition-all"><Facebook className="w-4 h-4" /></a>
                        <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#705d3f] transition-all"><Instagram className="w-4 h-4" /></a>
                        <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#705d3f] transition-all"><Linkedin className="w-4 h-4" /></a>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-12 w-fit pb-3">LIÊN KẾT NHANH</h4>
                    <ul className="grid grid-cols-1 gap-6 text-[11px] text-white/80 font-bold tracking-[0.2em] uppercase">
                        <li><a href="#" onClick={(e) => handleNavigate(e, '/about')} className="hover:text-white transition-colors">VỀ CHÚNG TÔI</a></li>
                        <li><a href="#" onClick={(e) => handleNavigate(e, '/services')} className="hover:text-white transition-colors">DỊCH VỤ</a></li>
                        <li><a href="#projects" onClick={handleScrollProjects} className="hover:text-white transition-colors">DỰ ÁN</a></li>
                        <li><a href="#" onClick={(e) => handleNavigate(e, '/handbook')} className="hover:text-white transition-colors">CẨM NANG</a></li>
                        <li><a href="#" onClick={(e) => handleNavigate(e, '/contact')} className="hover:text-white transition-colors">LIÊN HỆ</a></li>
                        <li><a href="yeu-cau-thiet-ke.html" target="_blank" className="text-brand-primary hover:text-white transition-colors">GỬI YÊU CẦU THIẾT KẾ</a></li>
                    </ul>
                </div>

                {/* Column 3: Contact Info */}
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-12 w-fit pb-3">THÔNG TIN LIÊN HỆ</h4>
                    <div className="space-y-8 text-[11px] text-white/80 font-medium tracking-widest leading-loose">
                        <a href="#" className="flex gap-5 hover:text-white transition-colors group uppercase">
                            <MapPin className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                            <span>số 10 ngõ 142 Hào Nam, Đống Đa, Hà Nội</span>
                        </a>
                        <a href="#" className="flex gap-5 hover:text-white transition-colors group uppercase">
                            <Phone className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                            <span>hot line: 0985578385</span>
                        </a>
                        <a href="mailto:nghiavu2011@gmail.com" className="flex gap-5 hover:text-white transition-colors group">
                            <Mail className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                            <span className="uppercase">nghiavu2011@gmail.com</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="container mx-auto px-6 mt-20 pt-8 text-center text-[10px] text-white/50 uppercase tracking-[0.4em]">
                © 2024 N&M Studio. All rights reserved. Excellence in Every Design.
            </div>
        </footer>
    );
};

export default Footer;
