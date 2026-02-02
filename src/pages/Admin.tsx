import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Plus, Trash2, Edit, Upload, X } from 'lucide-react';

const Admin = () => {
    useEffect(() => {
        console.log("!!! ADMIN COMPONENT MOUNTED !!!");
    }, []);
    const [user, setUser] = useState<any>(null);

    // Login State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Dashboard State
    const [posts, setPosts] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: 'arch', // Default category
        location: '',
        year: new Date().getFullYear().toString(),
        style: '',
        floors: '',
        area: '',
        type: '',
        description: '',
        gallery: [] as string[]
    });

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
            setError("Login failed. Check your email/password.");
            console.error(err);
        }
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title) return alert("Title is required");

        try {
            setUploading(true);
            await addDoc(collection(db, "projects"), {
                ...formData,
                createdAt: new Date().toISOString()
            });
            alert("Project created successfully!");
            setFormData({
                title: '', category: 'arch', location: '', year: new Date().getFullYear().toString(),
                style: '', floors: '', area: '', type: '', description: '', gallery: []
            });
            setIsEditing(false);
            fetchPosts();
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error saving post");
        } finally {
            setUploading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setUploading(true);
        const files = Array.from(e.target.files);

        try {
            const uploadPromises = files.map(async (file: File) => {
                const fileRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
                await uploadBytes(fileRef, file);
                return await getDownloadURL(fileRef);
            });

            const urls = await Promise.all(uploadPromises);
            setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...urls] }));
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed. Check console.");
        } finally {
            setUploading(false);
        }
    };

    const handleDeletePost = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await deleteDoc(doc(db, "projects", id));
            fetchPosts();
        } catch (e) {
            console.error("Error deleting doc:", e);
        }
    };

    const removeImage = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== indexToRemove)
        }));
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 py-32">
                <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md border-t-8 border-brand-primary animate-fadeIn">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-heading font-black text-brand-secondary uppercase tracking-tighter">HỆ THỐNG QUẢN TRỊ</h2>
                        <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">N&M Studio Control Panel</p>
                    </div>
                    {error && <p className="bg-red-50 text-red-500 text-xs p-3 rounded mb-6 border border-red-100 font-medium">{error}</p>}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" required className="mt-1 block w-full border border-gray-300 rounded p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" required className="mt-1 block w-full border border-gray-300 rounded p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="w-full bg-brand-primary text-white py-2 rounded hover:bg-brand-secondary transition font-bold">LOGIN</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-24 min-h-screen bg-gray-50 text-gray-800">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-heading font-bold text-brand-secondary">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-2 bg-brand-primary text-white px-4 py-2 rounded shadow hover:bg-brand-secondary transition">
                            <Plus className="w-4 h-4" /> {isEditing ? 'Cancel' : 'New Project'}
                        </button>
                        <button onClick={() => signOut(auth)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Sign Out</button>
                    </div>
                </div>

                {isEditing && (
                    <div className="bg-white p-8 rounded shadow-xl mb-10 animate-fadeIn border border-gray-200">
                        <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-brand-primary">Create New Project</h2>
                        <form onSubmit={handleCreatePost} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Tên Dự Án</label>
                                    <input className="w-full border p-2 rounded" placeholder="e.g. Villa Riverside" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Danh Mục</label>
                                    <select className="w-full border p-2 rounded" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                        <option value="arch">Kiến Trúc</option>
                                        <option value="interior">Nội Thất</option>
                                        <option value="construction">Thi Công</option>
                                        <option value="cgi">CGI</option>
                                        <option value="ai">AI Creative</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Vị Trí</label>
                                    <input className="w-full border p-2 rounded" placeholder="Hà Nội" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Năm</label>
                                    <input className="w-full border p-2 rounded" placeholder="2024" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Diện Tích</label>
                                    <input className="w-full border p-2 rounded" placeholder="350m2" value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Số Tầng / Quy Mô</label>
                                    <input className="w-full border p-2 rounded" placeholder="3 tầng" value={formData.floors} onChange={e => setFormData({ ...formData, floors: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Phong Cách</label>
                                    <input className="w-full border p-2 rounded" placeholder="Hiện đại / Indochine" value={formData.style} onChange={e => setFormData({ ...formData, style: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Loại Hình</label>
                                    <input className="w-full border p-2 rounded" placeholder="Biệt thự / Nhà phố" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Mô tả</label>
                                <textarea className="w-full border p-2 rounded h-32" placeholder="Mô tả chi tiết dự án..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Hình Ảnh (Gallery)</label>
                                <div className="border-2 border-dashed border-gray-300 p-8 text-center rounded bg-gray-50 hover:bg-gray-100 transition relative">
                                    {uploading ? (
                                        <p className="text-brand-primary animate-pulse">Uploading...</p>
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">Click to upload images</p>
                                            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        </>
                                    )}
                                </div>
                                {/* Preview Gallery */}
                                {formData.gallery.length > 0 && (
                                    <div className="grid grid-cols-6 gap-2 mt-4">
                                        {formData.gallery.map((url, idx) => (
                                            <div key={idx} className="relative group aspect-square">
                                                <img src={url} className="w-full h-full object-cover rounded shadow-sm" alt="Preview" />
                                                <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"><X className="w-3 h-3" /></button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end pt-4">
                                <button type="submit" disabled={uploading} className="bg-brand-primary text-white px-8 py-3 rounded font-bold uppercase tracking-widest hover:bg-brand-secondary transition disabled:opacity-50">
                                    {uploading ? 'Processing...' : 'Publish Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold uppercase text-sm text-gray-500 tracking-widest">Existing Projects ({posts.length})</h3>
                    </div>
                    {posts.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">No projects found. Create one!</div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {posts.map((post) => (
                                <div key={post.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                                            {post.gallery?.[0] && <img src={post.gallery[0]} className="w-full h-full object-cover" alt="Thumb" />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-secondary">{post.title}</h4>
                                            <p className="text-xs text-gray-500">{post.category} • {post.year}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {/* Edit feature could be added later, simplified to just delete for now */}
                                        <button onClick={() => handleDeletePost(post.id)} className="p-2 text-red-400 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
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
