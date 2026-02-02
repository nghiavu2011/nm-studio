import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface ProjectDetailProps {
    projects: any[];
}

const ProjectDetail = ({ projects }: ProjectDetailProps) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const project = projects.find(p => String(p.id) === id);
    const [mainImage, setMainImage] = useState<string>('');

    useEffect(() => {
        if (project && project.gallery && project.gallery.length > 0) {
            setMainImage(project.gallery[0]);
        }
    }, [project]);

    if (!project) {
        return (
            <div className="pt-32 text-center">
                <p>Không tìm thấy dự án hoặc đang tải...</p>
                <button onClick={() => navigate('/')} className="text-brand-primary mt-4 underline">Quay về trang chủ</button>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-white animate-fadeIn">
            <div className="container mx-auto px-6 py-12">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-brand-primary text-xs font-bold uppercase tracking-widest mb-12 transition-all group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Quay lại trang chủ
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
                            onClick={() => navigate('/contact')}
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

export default ProjectDetail;
