
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, X, ChevronRight, ChevronLeft, ArrowLeft, ArrowRight,
  PenTool, Hammer, Home, Star, FileText, Settings, Shield,
  Handshake, ClipboardList, Building2, HardHat,
  Clock, Share2, Printer, CheckCircle2, Layout, Search,
  Zap, MessageSquare, Image as ImageIcon, BarChart3,
  MapPin, Phone, Mail, FileSignature, CheckCircle, Facebook, Instagram, Youtube, Linkedin,
  Layers, Monitor, Cpu, Coins, SearchCode, Camera, BrainCircuit, NotebookPen, Calculator,
  BookOpen, Calendar, Send, Plus
} from 'lucide-react';

// --- DATA & CONTENT ---


// --- DATA & CONTENT ---

let NAV_ITEMS: any[] = [];
let HERO_IMAGES: string[] = [];
let PROJECT_CATEGORIES: any[] = [];
let PROJECTS: any[] = [];

// Fallback data for initial load
const DEFAULT_CONTENT = {
  nav_items: [
    { label: 'VỀ CHÚNG TÔI', href: '#story', view: 'about' },
    { label: 'DỊCH VỤ', href: '#services', view: 'services' },
    { label: 'DỰ ÁN', href: '#projects', view: 'home' },
    { label: 'CẨM NANG', href: '#blog', view: 'handbook' },
    { label: 'LIÊN HỆ', href: '#contact', view: 'contact' },
  ],
  hero_images: [
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000"
  ],
  project_categories: [
    { id: 'all', label: 'Tất cả', header: 'TẤT CẢ DỰ ÁN' },
    { id: 'arch', label: 'Thiết kế kiến trúc', header: 'THIẾT KẾ KIẾN TRÚC' },
    { id: 'interior', label: 'Thiết kế nội thất', header: 'THIẾT KẾ NỘI THẤT' },
    { id: 'construction', label: 'Thi Công', header: 'THI CÔNG HOÀN THIỆN' },
    { id: 'cgi', label: 'Diễn họa CGI', header: 'DIỄN HỌA CGI' },
    { id: 'ai', label: 'Dịch Vụ AI', header: 'SÁNG TẠO BẰNG AI' },
  ],
  projects: []
};

const SERVICES_BRIEF = [
  { title: "THIẾT KẾ KIẾN TRÚC", icon: <PenTool className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600" },
  { title: "THIẾT KẾ NỘI THẤT", icon: <Layout className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600" },
  { title: "THI CÔNG HOÀN THIỆN", icon: <Hammer className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=600" },
  { title: "TƯ VẤN GIÁM SÁT", icon: <HardHat className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600" },
  { title: "DIỄN HOẠ CGI", icon: <Camera className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=600" },
  { title: "SÁNG TẠO BẰNG AI", icon: <Zap className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600" }
];

const PROCESS_DATA = {
  arch: {
    label: "QUY TRÌNH THIẾT KẾ KIẾN TRÚC",
    stages: [
      { title: "GĐ 1", subtitle: "TIẾP NHẬN THÔNG TIN & KHẢO SÁT", desc: "Tiếp nhận yêu cầu, khảo sát hiện trạng đất/công trình và khảo sát nhu cầu chi tiết của gia chủ.", icon: <SearchCode className="w-8 h-8" /> },
      { title: "GĐ 2", subtitle: "BÁO GIÁ & HỢP ĐỒNG", desc: "Lập báo giá chi tiết, chốt tiến độ và ký kết hợp đồng thiết kế chính thức.", pay: "💰 50% Phí thiết kế", icon: <FileSignature className="w-8 h-8" /> },
      { title: "GĐ 3", subtitle: "PHÁC THẢO & CONCEPT", desc: "Mặt bằng công năng (2D) và giải giải pháp hình khối kiến trúc (3D). Điều chỉnh tối đa 3 lần.", pay: "💰 30% Phí thiết kế", icon: <PenTool className="w-8 h-8" /> },
      { title: "GĐ 4", subtitle: "HỒ SƠ KỸ THUẬT THI CÔNG", desc: "Triển khai hồ sơ kỹ thuật chi tiết phục vụ xin phép và thi công hoàn thiện.", pay: "💰 20% Bàn giao hồ sơ", icon: <Layout className="w-8 h-8" /> }
    ]
  },
  interior: {
    label: "QUY TRÌNH THIẾT KẾ NỘI THẤT",
    stages: [
      { title: "GĐ 1", subtitle: "KHẢO SÁT & PHÂN TÍCH", desc: "Khảo sát hiện trạng mặt bằng, đo đạc và phân tích thói quen sinh hoạt gia chủ.", icon: <Search className="w-8 h-8" /> },
      { title: "GĐ 2", subtitle: "BÁO GIÁ & HỢP ĐỒNG", desc: "Đề xuất phương án hợp tác và ký kết hợp đồng thiết kế nội thất.", pay: "💰 50% Phí thiết kế", icon: <Calculator className="w-8 h-8" /> },
      { title: "GĐ 3", subtitle: "PHÁC THẢO & CONCEPT", desc: "Mặt bằng 2D, Concept Moodboard vật liệu và dựng phối cảnh 3D nội thất.", pay: "💰 30% Phí thiết kế", icon: <ImageIcon className="w-8 h-8" /> },
      { title: "GĐ 4", subtitle: "HỒ SƠ KỸ THUẬT", desc: "Thiết kế hồ sơ kỹ thuật thi công, sản xuất nội thất chi tiết và bàn giao.", pay: "💰 20% Bàn giao hồ sơ", icon: <NotebookPen className="w-8 h-8" /> }
    ]
  },
  construction: {
    label: "THI CÔNG HOÀN THIỆN NỘI THẤT",
    stages: [
      { title: "GĐ 1", subtitle: "CHUẨN BỊ", desc: "Khảo sát đo đạc thực tế, lập dự toán chi tiết và ký hợp đồng thi công.", pay: "💰 50% Tạm ứng thi công", icon: <ClipboardList className="w-8 h-8" /> },
      { title: "GĐ 2", subtitle: "TRIỂN KHAI THI CÔNG", desc: "Sản xuất nội thất tại xưởng, thi công lắp đặt tại công trình theo tiến độ.", pay: "💰 30% Theo tiến độ", icon: <Hammer className="w-8 h-8" /> },
      { title: "GĐ 3", subtitle: "HOÀN THIỆN & BÀN GIAO", desc: "Nghiệm thu thẩm mỹ, bàn giao công trình và kích hoạt bảo hành.", pay: "💰 20% Khi bàn giao", icon: <Building2 className="w-8 h-8" /> }
    ]
  },
  supervision: {
    label: "TƯ VẤN GIÁM SÁT",
    stages: [
      { title: "GĐ 1", subtitle: "TIẾP NHẬN & THỐNG NHẤT", desc: "Tiếp nhận hồ sơ thiết kế, xác định phạm vi và lập kế hoạch giám sát.", pay: "💰 40% Tạm ứng", icon: <NotebookPen className="w-8 h-8" /> },
      { title: "GĐ 2", subtitle: "GIÁM SÁT THI CÔNG", desc: "Kiểm tra thi công theo hồ sơ, ghi nhận báo cáo và kiến nghị điều chỉnh kỹ thuật.", pay: "💰 40% Theo tiến độ", icon: <HardHat className="w-8 h-8" /> },
      { title: "GĐ 3", subtitle: "NGHIỆM THU & BÀN GIAO", desc: "Tham gia nghiệm thu hoàn thiện và báo cáo đánh giá kết quả giám sát.", pay: "💰 20% Kết thúc HĐ", icon: <CheckCircle2 className="w-8 h-8" /> }
    ]
  },
  cgi: {
    label: "QUY TRÌNH DIỄN HOẠ CGI",
    stages: [
      { title: "GĐ 1", subtitle: "TIẾP NHẬN BRIEF", desc: "Nhận bản vẽ concept, thống nhất số lượng ảnh và mức độ chi tiết thể hiện.", pay: "💰 50% Tạm ứng", icon: <FileText className="w-8 h-8" /> },
      { title: "GĐ 2", subtitle: "DỰNG HÌNH & ÁNH SÁNG", desc: "Dựng Model 3D không gian, thiết lập vật liệu, ánh sáng và góc máy.", icon: <Layers className="w-8 h-8" /> },
      { title: "GĐ 3", subtitle: "RENDER & HIỆU CHỈNH", desc: "Render ảnh chất lượng cao và hiệu chỉnh theo phản hồi của khách hàng.", pay: "💰 40% Sau Render", icon: <Camera className="w-8 h-8" /> },
      { title: "GĐ 4", subtitle: "BÀN GIAO", desc: "Bàn giao sản phẩm Final chất lượng cao phục vụ truyền thông.", pay: "💰 10% Quyết toán", icon: <Share2 className="w-8 h-8" /> }
    ]
  },
  ai: {
    label: "SÁNG TẠO BẰNG AI",
    stages: [
      { title: "GĐ 1", subtitle: "TIẾP NHẬN & ĐỊNH HƯỚNG", desc: "Nhận Brief mục tiêu sử dụng, đề xuất hướng concept AI phù hợp.", pay: "💰 50% Tạm ứng", icon: <Zap className="w-8 h-8" /> },
      { title: "GĐ 2", subtitle: "TRIỂN KHAI PHƯƠNG ÁN AI", desc: "Tạo concept & hình ảnh bằng AI chuyên sâu, thử nghiệm nhiều biến thể nhanh.", icon: <BrainCircuit className="w-8 h-8" /> },
      { title: "GĐ 3", subtitle: "TINH CHỈNH & HOÀN THIỆN", desc: "Lọc chọn phương án tốt nhất và tinh chỉnh chi tiết theo phản hồi.", pay: "💰 40% Chốt phương án", icon: <Settings className="w-8 h-8" /> },
      { title: "GĐ 4", subtitle: "BÀN GIAO", desc: "Bàn giao sản phẩm Final và hướng dẫn hỗ trợ sử dụng cho gia chủ.", pay: "💰 10% Quyết toán", icon: <Monitor className="w-8 h-8" /> }
    ]
  }
};

// --- COMPONENTS ---

const Counter = ({ target, duration = 1000, suffix = "+" }: { target: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const currentCount = Math.min(Math.floor((progress / duration) * target), target);
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  // Updated number color to #705d3f with drop-shadow for clarity
  return (
    <div
      ref={elementRef}
      className="text-4xl font-heading font-bold text-[#705d3f] transition-colors duration-300"
      style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))' }}
    >
      {count}{suffix}
    </div>
  );
};

const Header = ({ onNavigate, currentView, onScrollToProjects, navItems }: { onNavigate: (view: string) => void, currentView: string, onScrollToProjects: () => void, navItems: any[] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const transparentViews = ['home', 'project_detail', 'handbook', 'contact'];
  const headerBgClass = (!transparentViews.includes(currentView)) ? 'bg-white shadow-sm py-3' : (isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-6');
  const textColorClass = (!transparentViews.includes(currentView)) || isScrolled ? 'text-gray-800' : 'text-white';
  const logoClass = (!transparentViews.includes(currentView)) || isScrolled ? '' : 'brightness-0 invert';

  return (
    <header className={`fixed w-full z-40 transition-all duration-300 ${headerBgClass}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
          <img
            src="https://lh3.googleusercontent.com/d/18wUo0JZ3MWDLKqjRqFsS6PB5jDbZYNsA"
            className={`h-12 ${logoClass}`}
            alt="N&M Studio Logo"
          />
        </div>
        <nav className="hidden lg:flex gap-8">
          {(navItems || []).map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                if (item.label === 'DỰ ÁN') {
                  onScrollToProjects();
                } else if (item.view && item.view !== 'home') {
                  onNavigate(item.view);
                } else if (currentView !== 'home') {
                  onNavigate('home');
                }
              }}
              className={`text-[11px] font-bold uppercase tracking-widest hover:text-brand-primary transition-colors ${textColorClass}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button className={`lg:hidden ${textColorClass}`}><Menu /></button>
      </div>
    </header>
  );
};

const HeroCarousel = ({ heroImages }: { heroImages: string[] }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === (heroImages || []).length - 1 ? 0 : prev + 1));
  }, [heroImages]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? (heroImages || []).length - 1 : prev - 1));
  }, [heroImages]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {(heroImages || []).map((img: string, idx: number) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 animate-breathe">
            <img src={img} className="w-full h-full object-cover" alt={`Hero ${idx + 1}`} />
          </div>
          <div className="absolute inset-0 bg-black/45 animate-pulse-brightness" />
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 border border-white/20 text-white rounded-full hover:bg-brand-primary hover:border-brand-primary transition-all group"
      >
        <ChevronLeft className="w-10 h-10 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 border border-white/20 text-white rounded-full hover:bg-brand-primary hover:border-brand-primary transition-all group"
      >
        <ChevronRight className="w-10 h-10 group-hover:scale-110 transition-transform" />
      </button>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {(heroImages || []).map((_: any, idx: number) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-500 rounded-full h-1.5 ${idx === current ? 'w-12 bg-brand-primary' : 'w-4 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectDetailView = ({ project, onBack, onContact }: { project: any, onBack: () => void, onContact: () => void }) => {
  const [mainImage, setMainImage] = useState(project.gallery[0]);

  return (
    <div className="pt-24 min-h-screen bg-white animate-fadeIn">
      <div className="container mx-auto px-6 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-brand-primary text-xs font-bold uppercase tracking-widest mb-12 transition-all group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Quay lại dự án
        </button>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/3 space-y-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 leading-tight mb-4 uppercase">{project.title}</h1>
              <div className="w-16 h-1 bg-brand-primary"></div>
            </div>
            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              {[
                { label: 'Vị trí', val: project.location },
                { label: 'Năm thực hiện', val: project.year },
                { label: 'Phong cách', val: project.style },
                { label: 'Quy mô', val: project.floors },
                { label: 'Diện tích', val: project.area },
                { label: 'Loại hình', val: project.type }
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-gray-800 uppercase">{item.val}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Mô tả dự án</p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">{project.description}</p>
            </div>
            {/* Updated button to Redirect to Contact page */}
            <button
              onClick={onContact}
              className="w-full bg-brand-primary text-white py-4 px-10 text-[11px] font-bold uppercase tracking-widest hover:bg-brand-secondary transition-all shadow-lg"
            >
              LIÊN HỆ NGAY
            </button>
          </div>
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="aspect-video w-full overflow-hidden shadow-2xl bg-gray-100">
              <img src={mainImage} className="w-full h-full object-cover animate-fadeIn" alt={project.title} />
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {project.gallery.map((img: string, i: number) => (
                <div key={i} onClick={() => setMainImage(img)} className={`aspect-square overflow-hidden cursor-pointer border-2 transition-all ${mainImage === img ? 'border-brand-primary opacity-100 scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={img} className="w-full h-full object-cover" alt={`Thumb ${i}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactView = () => {
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

const HandbookView = () => {
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

const AboutUsView = () => {
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

const ServicesView = () => {
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

const App = () => {
  const [content, setContent] = useState<any>(DEFAULT_CONTENT);
  const [currentView, setCurrentView] = useState('home');
  const [activeProcessTab, setActiveProcessTab] = useState<keyof typeof PROCESS_DATA>('arch');
  const [activeProjectCategory, setActiveProjectCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [loading, setLoading] = useState(true);

  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/content.json')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load content:", err);
        setLoading(false);
      });
  }, []);

  const navigate = (view: string) => {
    setCurrentView(view);
    setSelectedProject(null);
    window.scrollTo(0, 0);
  };

  const scrollToProjects = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openProjectDetail = (project: any) => {
    setSelectedProject(project);
    setCurrentView('project_detail');
    window.scrollTo(0, 0);
  };

  const { nav_items, hero_images, project_categories, projects } = content;

  const filteredProjects = activeProjectCategory === 'all'
    ? projects
    : projects.filter((p: any) => p.category === activeProjectCategory);

  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3);

  const activeHeader = (project_categories || []).find((c: any) => c.id === activeProjectCategory)?.header || 'TẤT CẢ DỰ ÁN';

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#111]">
        <div className="animate-pulse text-brand-primary font-heading font-bold tracking-widest uppercase text-xl">NM Studio Loading...</div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-900 selection:bg-brand-primary selection:text-white">
      <Header onNavigate={navigate} currentView={currentView} onScrollToProjects={scrollToProjects} navItems={nav_items} />

      {currentView === 'home' && (
        <>
          <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
            <HeroCarousel heroImages={hero_images} />
            <div className="relative z-10 text-center px-6 max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 leading-tight">
                Giải pháp không gian từ ý tưởng đến hoàn thiện
              </h1>
              <p className="text-sm md:text-base text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                Thiết kế, thi công, diễn hoạ và sáng tạo bằng AI
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToProjects(); }} className="bg-brand-primary py-4 px-10 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">XEM CÔNG TRÌNH THỰC TẾ</a>
              </div>
            </div>
          </section>

          <section className="bg-white py-20 border-b border-gray-100">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
              {[
                { v: 15, l: 'NĂM KINH NGHIỆM' },
                { v: 250, l: 'CÔNG TRÌNH HOÀN THIỆN' },
                { v: 10, l: 'TỈNH THÀNH / QUỐC GIA' }
              ].map((s, i) => (
                <div key={i} className="group cursor-default flex flex-col items-center">
                  <Counter target={s.v} />
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-2 font-bold">{s.l}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="services" className="py-24 bg-white border-b border-gray-50 overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-widest">DỊCH VỤ CUNG CẤP</h2>
                <div className="w-20 h-1 bg-brand-primary mx-auto mt-6"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {SERVICES_BRIEF.map((s, i) => (
                  <div key={i} onClick={() => navigate('services')} className="group relative overflow-hidden h-[350px] cursor-pointer shadow-lg rounded-sm">
                    <img src={s.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={s.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                      <div className="text-brand-primary mb-3 transition-transform group-hover:-translate-y-1">{s.icon}</div>
                      <h3 className="text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.15em] leading-tight">{s.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-[#e0ddd2] text-gray-900 overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="flex justify-center mb-16 overflow-x-auto scrollbar-hide pb-4">
                <div className="inline-flex bg-white/50 p-1 rounded-sm border border-black/5 whitespace-nowrap shadow-sm">
                  {Object.keys(PROCESS_DATA).map((key) => (
                    <button key={key} onClick={() => setActiveProcessTab(key as keyof typeof PROCESS_DATA)} className={`px-5 py-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeProcessTab === key ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-500 hover:text-brand-primary'}`}>
                      {PROCESS_DATA[key as keyof typeof PROCESS_DATA].label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="max-w-7xl mx-auto relative px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {PROCESS_DATA[activeProcessTab].stages.map((stage, i) => (
                    <div key={i} className="relative group animate-fadeIn flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center z-10 group-hover:border-brand-primary transition-all shadow-md mb-6">
                        <div className="text-gray-400 group-hover:text-brand-primary transition-all scale-75">{stage.icon}</div>
                      </div>
                      <div className="bg-white/70 backdrop-blur-sm p-6 rounded-sm border border-black/5 group-hover:border-brand-primary/20 transition-all flex flex-col items-center w-full h-full shadow-sm hover:shadow-xl group-hover:bg-white">
                        <h5 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-2">{stage.title}</h5>
                        <h4 className="text-sm md:text-base font-bold mb-4 uppercase tracking-widest min-h-[40px] flex items-center justify-center text-gray-800">{stage.subtitle}</h4>
                        <p className="text-gray-600 text-[11px] font-medium tracking-widest leading-relaxed mb-6">{stage.desc}</p>
                        {stage.pay && (
                          <div className="mt-auto flex items-center gap-2 bg-brand-primary/10 py-2 px-4 rounded-sm border border-brand-primary/10 w-fit">
                            <Coins className="w-3 h-3 text-brand-primary" />
                            <span className="text-[9px] font-bold text-brand-primary uppercase tracking-widest leading-none">THỐNG TOÁN: {stage.pay.replace('💰', '').trim()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="projects" ref={projectsRef} className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="w-full md:w-1/2">
                  <h4 className="text-brand-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 uppercase">DỰ ÁN</h4>
                  <h2 className="text-4xl font-heading font-bold uppercase tracking-widest transition-all animate-fadeIn">{activeHeader}</h2>
                </div>
                <div className="w-full md:w-1/2 flex justify-end">
                  <div className="flex flex-wrap gap-2 justify-end bg-white/50 p-2 border border-gray-100 rounded-sm">
                    {(project_categories || []).map((cat: any) => (
                      <button key={cat.id} onClick={() => { setActiveProjectCategory(cat.id); setShowAllProjects(false); }} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeProjectCategory === cat.id ? 'bg-brand-primary text-white shadow-sm' : 'text-gray-400 hover:text-brand-primary'}`}>
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleProjects.length > 0 ? (
                  visibleProjects.map(p => (
                    <div key={p.id} onClick={() => openProjectDetail(p)} className="group cursor-pointer bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 rounded-sm">
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img src={p.gallery[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={p.title} />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                      <div className="p-8 flex justify-between items-center text-center">
                        <div className="w-full">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors uppercase">{p.title}</h3>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{p.floors} • {p.area} • {p.style}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center opacity-40">
                    <p className="text-[10px] uppercase font-bold tracking-widest">Đang cập nhật thêm dự án trong mục này...</p>
                  </div>
                )}
              </div>

              {!showAllProjects && filteredProjects.length > 3 && (
                <div className="flex justify-center mt-16 animate-fadeIn">
                  <button
                    onClick={() => setShowAllProjects(true)}
                    className="border-2 border-[#705d3f] text-[#705d3f] px-12 py-4 text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-[#705d3f] hover:text-white transition-all rounded-sm shadow-md flex items-center gap-4 group"
                  >
                    TẢI THÊM <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {currentView === 'project_detail' && selectedProject && (
        <ProjectDetailView
          project={selectedProject}
          onBack={() => navigate('home')}
          onContact={() => navigate('contact')}
        />
      )}
      {currentView === 'about' && <AboutUsView />}
      {currentView === 'services' && <ServicesView />}
      {currentView === 'handbook' && <HandbookView />}
      {currentView === 'contact' && <ContactView />}

      {/* FOOTER SECTION: Updated Background Color to #705d3f and removed divider lines */}
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
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('about'); }} className="hover:text-white transition-colors">VỀ CHÚNG TÔI</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('services'); }} className="hover:text-white transition-colors">DỊCH VỤ</a></li>
              <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToProjects(); }} className="hover:text-white transition-colors">DỰ ÁN</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('handbook'); }} className="hover:text-white transition-colors">CẨM NANG</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('contact'); }} className="hover:text-white transition-colors">LIÊN HỆ</a></li>
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

        {/* Bottom Bar: Removed border-t */}
        <div className="container mx-auto px-6 mt-20 pt-8 text-center text-[10px] text-white/50 uppercase tracking-[0.4em]">
          © 2024 N&M Studio. All rights reserved. Excellence in Every Design.
        </div>
      </footer>

      <style>{`
        @keyframes breathe {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes pulse-brightness {
          0% { background-color: rgba(0, 0, 0, 0.45); }
          50% { background-color: rgba(0, 0, 0, 0.25); }
          100% { background-color: rgba(0, 0, 0, 0.45); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-breathe { animation: breathe 15s ease-in-out infinite; }
        .animate-pulse-brightness { animation: pulse-brightness 8s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        
        /* Checkbox Styling */
        input[type="checkbox"] {
          border-radius: 2px;
        }
        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-position: right 1rem center;
          background-repeat: no-repeat;
          background-size: 1rem;
        }
      `}</style>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
