import React, { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Plus, Trash2, Edit, Upload, X, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const Admin = () => {
    const [user, setUser] = useState<any>(null);

    // Login State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Dashboard State
    const [posts, setPosts] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editPostId, setEditPostId] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');

    // Form State
    const initialFormState = {
        title: '',
        category: 'arch', 
        location: '',
        year: new Date().getFullYear().toString(),
        style: '',
        floors: '',
        area: '',
        type: '',
        description: '',
        gallery: [] as string[]
    };
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((u) => {
            setUser(u);
            if (u) fetchPosts();
        });
        return unsubscribe;
    }, []);

    const fetchPosts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "projects"));
            const loadedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sort by latest year
            loadedPosts.sort((a: any, b: any) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
            setPosts(loadedPosts);
        } catch (e) {
            console.error("Error fetching posts:", e);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            setError("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản dán đúng chưa.");
            console.error(err);
        }
    };

    const handleCreateOrUpdatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title) return alert("Vui lòng nhập tên dự án!");

        try {
            setUploading(true);
            if (editPostId) {
                await updateDoc(doc(db, "projects", editPostId), {
                    ...formData,
                    updatedAt: new Date().toISOString()
                });
                alert("Đã cập nhật dự án thành công!");
            } else {
                await addDoc(collection(db, "projects"), {
                    ...formData,
                    createdAt: new Date().toISOString()
                });
                alert("Đã thêm dự án mới thành công!");
            }
            
            setFormData(initialFormState);
            setEditPostId(null);
            setIsEditing(false);
            fetchPosts();
        } catch (e: any) {
            console.error("Error saving document: ", e);
            alert(`Lỗi lưu dữ liệu: ${e.message}\n(Kiểm tra Firebase Rules!)`);
        } finally {
            setUploading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setUploading(true);
        const files = Array.from(e.target.files);
        const cloudName = "dwupjsbf0";
        const uploadPreset = "nmstudio_upload";

        try {
            const uploadPromises = files.map(async (file: File) => {
                const fd = new FormData();
                fd.append("file", file);
                fd.append("upload_preset", uploadPreset);

                const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: "POST",
                    body: fd
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || "Upload failed");
                }
                const data = await response.json();
                return data.secure_url;
            });

            const urls = await Promise.all(uploadPromises);
            setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...urls] }));
        } catch (error) {
            console.error("Upload failed", error);
            alert("Đã có lỗi xảy ra khi tải ảnh lên Cloudinary.");
        } finally {
            setUploading(false);
        }
    };

    const handleDeletePost = async (id: string, title: string) => {
        if (!confirm(`Bạn có chắc muốn xóa dự án "${title}" không? Hành động này không thể hoàn tác.`)) return;
        try {
            await deleteDoc(doc(db, "projects", id));
            fetchPosts();
        } catch (e) {
            console.error("Error deleting:", e);
        }
    };

    const handleEditBtn = (post: any) => {
        setFormData({
            title: post.title || '',
            category: post.category || 'arch',
            location: post.location || '',
            year: post.year || new Date().getFullYear().toString(),
            style: post.style || '',
            floors: post.floors || '',
            area: post.area || '',
            type: post.type || '',
            description: post.description || '',
            gallery: post.gallery || []
        });
        setEditPostId(post.id);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const removeImage = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== indexToRemove)
        }));
    };

    const moveImage = (index: number, direction: 'left' | 'right') => {
        setFormData(prev => {
            const newArr = [...prev.gallery];
            if (direction === 'left' && index > 0) {
                [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
            } else if (direction === 'right' && index < newArr.length - 1) {
                [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
            }
            return { ...prev, gallery: newArr };
        });
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F3] py-32 font-sans px-6">
                <div className="bg-white p-12 rounded-sm shadow-2xl w-full max-w-md border-t-[6px] border-brand-primary animate-fadeIn flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[200px] bg-brand-primary/5 pointer-events-none"></div>
                    <div className="text-center mb-10 relative z-10">
                        <img src="https://lh3.googleusercontent.com/d/18wUo0JZ3MWDLKqjRqFsS6PB5jDbZYNsA" className="h-10 mx-auto mb-6 brightness-0 opacity-80" alt="Logo" />
                        <h2 className="text-3xl font-heading font-black text-brand-secondary uppercase tracking-widest">WORKSPACE</h2>
                        <p className="text-[10px] text-gray-500 font-bold mt-2 tracking-[0.2em]">INTERNAL ACCESS ONLY</p>
                    </div>
                    {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 text-sm">{error}</div>}
                    <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Tài khoản (Email)</label>
                            <input type="email" required className="w-full border-b-2 border-gray-200 outline-none p-3 bg-transparent focus:border-brand-primary transition-colors text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Mật khẩu</label>
                            <input type="password" required className="w-full border-b-2 border-gray-200 outline-none p-3 bg-transparent focus:border-brand-primary transition-colors text-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="w-full bg-brand-primary text-white py-4 rounded-sm hover:bg-brand-secondary transition-all font-bold tracking-widest uppercase text-xs shadow-xl hover:shadow-2xl mt-4">TRUY CẬP</button>
                    </form>
                </div>
            </div>
        );
    }

    const filteredPosts = filterCategory === 'all' ? posts : posts.filter(p => p.category === filterCategory);

    return (
        <div className="pt-24 pb-24 min-h-screen bg-[#F5F5F3] font-sans">
            <div className="container mx-auto px-6 max-w-7xl">
                
                {/* Header Admin */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-sm shadow-sm mb-8 border border-gray-100 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-primary/10 flex items-center justify-center rounded-sm">
                            <img src="https://lh3.googleusercontent.com/d/18wUo0JZ3MWDLKqjRqFsS6PB5jDbZYNsA" className="h-4 brightness-0 opacity-80" alt="Icon" />
                        </div>
                        <div>
                            <h1 className="text-xl font-heading font-bold text-brand-secondary uppercase tracking-widest">N&M WORKSPACE</h1>
                            <p className="text-xs text-brand-primary tracking-widest uppercase font-bold">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => {
                            if (isEditing) { setIsEditing(false); setEditPostId(null); setFormData(initialFormState); }
                            else { setIsEditing(true); }
                        }} className="flex items-center gap-2 bg-brand-primary text-white px-6 py-3 text-xs tracking-widest uppercase font-bold rounded-sm shadow-md hover:scale-105 transition-all">
                            {isEditing ? 'HỦY BỎ LƯU' : <><Plus className="w-4 h-4" /> THÊM DỰ ÁN MỚI</>}
                        </button>
                        <button onClick={() => signOut(auth)} className="flex items-center gap-2 border border-red-500 text-red-500 px-6 py-3 text-xs tracking-widest uppercase font-bold rounded-sm hover:bg-red-500 hover:text-white transition-all">
                            <LogOut className="w-4 h-4" /> ĐĂNG XUẤT
                        </button>
                    </div>
                </div>

                {isEditing && (
                    <div className="bg-white p-8 md:p-12 rounded-sm shadow-xl mb-12 animate-fadeIn border-t-4 border-brand-primary relative">
                        <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-brand-secondary font-heading">
                            {editPostId ? `SỬA: ${formData.title}` : 'THÊM DỰ ÁN MỚI'}
                        </h2>
                        
                        <form onSubmit={handleCreateOrUpdatePost} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-2 block">Tên Dự Án *</label>
                                    <input required className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-brand-primary transition-colors text-lg font-bold" placeholder="VD: The Symphony Villa" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-2 block">Danh Mục *</label>
                                    <select className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-brand-primary bg-transparent font-bold capitalize" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                        <option value="arch">Kiến Trúc</option>
                                        <option value="interior">Nội Thất</option>
                                        <option value="construction">Thi Công</option>
                                        <option value="cgi">CGI</option>
                                        <option value="ai">AI Creative</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-2 block">Năm hoàn thành</label>
                                    <input className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-brand-primary" placeholder="2024" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-2 block">Vị Trí (Tỉnh / Thành)</label>
                                    <input className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-brand-primary" placeholder="Hà Nội, Việt Nam" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-2 block">Quy Mô / Tầng</label>
                                    <input className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-brand-primary" placeholder="03 Tầng" value={formData.floors} onChange={e => setFormData({ ...formData, floors: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-2 block">Diện Tích (m2)</label>
                                    <input className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-brand-primary" placeholder="500m2" value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-2 block">Phong Cách Thiết Kế</label>
                                    <input className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-brand-primary" placeholder="Wabi Sabi, Modern,..." value={formData.style} onChange={e => setFormData({ ...formData, style: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-2 block">Loại Hình (Type)</label>
                                    <input className="w-full border-b-2 border-gray-200 p-2 outline-none focus:border-brand-primary" placeholder="Biệt thự / Penthouse" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-2 block">Mô tả tóm tắt (Tuỳ chọn)</label>
                                <textarea className="w-full border-2 border-gray-200 p-4 outline-none focus:border-brand-primary rounded-sm h-32 leading-relaxed" placeholder="Mô tả ý tưởng cốt lõi của dự án..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-xs font-bold uppercase text-brand-primary tracking-widest">HÌNH ẢNH DỰ ÁN (GALLERY)</label>
                                    <p className="text-[10px] text-gray-400 capitalize bg-gray-100 px-2 py-1 rounded">Ảnh đầu tiên làm Cover</p>
                                </div>
                                <div className="border border-dashed border-gray-300 p-10 text-center rounded-sm bg-gray-50 hover:bg-white hover:border-brand-primary transition-all relative group cursor-pointer h-[150px] flex flex-col justify-center items-center">
                                    {uploading ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="animate-spin w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full"></div>
                                            <p className="text-xs font-bold tracking-widest uppercase text-brand-primary">Đang tải ảnh lên Cloudinary...</p>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-10 h-10 mx-auto text-gray-300 mb-3 group-hover:text-brand-primary transition-colors" />
                                            <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">KÉO THẢ HOẶC BẤM VÀO ĐỂ TẢI LÊN (CHỌN NHIỀU ẢNH)</p>
                                            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        </>
                                    )}
                                </div>

                                {/* Preview Gallery */}
                                {formData.gallery.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6">
                                        {formData.gallery.map((url, idx) => (
                                            <div key={idx} className="relative group aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden shadow-sm border border-gray-200">
                                                <img src={url} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Preview" />
                                                {/* Controls */}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                                    <div className="flex justify-between items-center text-white">
                                                        <button type="button" onClick={() => moveImage(idx, 'left')} className="p-1 hover:bg-white/20 rounded"><ChevronLeft className="w-4 h-4"/></button>
                                                        <span className="text-[10px] font-bold">#{idx + 1}</span>
                                                        <button type="button" onClick={() => moveImage(idx, 'right')} className="p-1 hover:bg-white/20 rounded"><ChevronRight className="w-4 h-4"/></button>
                                                    </div>
                                                    <button type="button" onClick={() => removeImage(idx)} className="bg-red-500 text-white w-full py-1 text-[10px] uppercase font-bold tracking-widest rounded-sm hover:bg-red-600 transition">XÓA</button>
                                                </div>
                                                {idx === 0 && <div className="absolute top-1 left-1 bg-brand-primary text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm z-10 pointer-events-none">COVER</div>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end pt-8 border-t border-gray-100">
                                <button type="submit" disabled={uploading} className="bg-brand-primary text-white px-12 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-brand-secondary transition-all disabled:opacity-50 shadow-lg flex items-center gap-2">
                                    {uploading ? 'Processing...' : (editPostId ? 'LƯU CẬP NHẬT' : 'PHÁT HÀNH DỰ ÁN')}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* List View */}
                <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold uppercase text-xs text-brand-secondary tracking-widest font-heading">
                            QUẢN LÝ DỰ ÁN ({filteredPosts.length})
                        </h3>
                        <select 
                            value={filterCategory} 
                            onChange={e => setFilterCategory(e.target.value)}
                            className="text-[10px] font-bold uppercase tracking-widest bg-white border border-gray-200 px-3 py-2 rounded-sm outline-none"
                        >
                            <option value="all">TẤT CẢ DANH MỤC</option>
                            <option value="arch">KIẾN TRÚC</option>
                            <option value="interior">NỘI THẤT</option>
                            <option value="construction">THI CÔNG</option>
                            <option value="cgi">CGI</option>
                        </select>
                    </div>

                    {filteredPosts.length === 0 ? (
                        <div className="p-16 text-center text-gray-400">
                            <p className="text-xs uppercase tracking-widest font-bold">Không có dự án nào trong mục này.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {filteredPosts.map((post) => (
                                <div key={post.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-32 h-24 bg-gray-100 rounded-sm overflow-hidden shadow-sm relative">
                                            {post.gallery?.[0] ? (
                                                <img src={post.gallery[0]} className="w-full h-full object-cover" alt="Thumb" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 uppercase">Khuyết ảnh</div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-brand-secondary uppercase truncate max-w-[200px] md:max-w-md">{post.title}</h4>
                                            <div className="flex gap-4 mt-2 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                                                <span>{post.category}</span>
                                                <span>•</span>
                                                <span>NĂM {post.year}</span>
                                                <span className="hidden md:inline">•</span>
                                                <span className="hidden md:inline">{post.gallery?.length || 0} HÌNH ẢNH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEditBtn(post)} className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-brand-secondary rounded-sm text-[10px] font-bold uppercase tracking-widest transition-colors"><Edit className="w-3 h-3" /> SỬA</button>
                                        <button onClick={() => handleDeletePost(post.id, post.title)} className="flex items-center gap-1 px-4 py-2 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-colors"><Trash2 className="w-3 h-3" /> XÓA</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
