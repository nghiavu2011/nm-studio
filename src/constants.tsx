import React from 'react';
import {
    PenTool, Hammer, Layout, HardHat, Camera, Zap, SearchCode, FileSignature, Search, Calculator, ImageIcon, NotebookPen, ClipboardList, Building2, CheckCircle2, FileText, Layers, Share2, BrainCircuit, Monitor, Settings
} from 'lucide-react';

export const DEFAULT_CONTENT = {
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

export const SERVICES_BRIEF = [
    { title: "THIẾT KẾ KIẾN TRÚC", icon: <PenTool className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600" },
    { title: "THIẾT KẾ NỘI THẤT", icon: <Layout className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600" },
    { title: "THI CÔNG HOÀN THIỆN", icon: <Hammer className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=600" },
    { title: "TƯ VẤN GIÁM SÁT", icon: <HardHat className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600" },
    { title: "DIỄN HOẠ CGI", icon: <Camera className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=600" },
    { title: "SÁNG TẠO BẰNG AI", icon: <Zap className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600" }
];

export const PROCESS_DATA = {
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
