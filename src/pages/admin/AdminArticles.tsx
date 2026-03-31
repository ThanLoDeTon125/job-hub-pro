import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import api from '@/lib/api';
import { Article } from '@/types';


export default function AdminArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    // State cho Form Thêm/Sửa
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({ title: '', content: '', thumbnailUrl: '' });

    const fetchArticles = async () => {
        try {
            const response = await api.get('/v1/articles');
            setArticles(response.data.Data || response.data || []);
        } catch (error) {
            console.error('Lỗi tải tin tức', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const openCreateForm = () => {
        setEditingId(null);
        setFormData({ title: '', content: '', thumbnailUrl: '' });
        setIsFormOpen(true);
    };

    const openEditForm = (article: Article) => {
        setEditingId(article.id);
        setFormData({ title: article.title, content: article.content, thumbnailUrl: article.thumbnailUrl || '' });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/v1/articles/${editingId}`, formData);
                toast({ title: 'Thành công', description: 'Đã cập nhật bài viết.' });
            } else {
                await api.post('/v1/articles', formData);
                toast({ title: 'Thành công', description: 'Đã xuất bản bài viết mới.' });
            }
            setIsFormOpen(false);
            fetchArticles(); // Refresh list
        } catch (error) {
            toast({ variant: 'destructive', title: 'Lỗi', description: 'Không thể lưu bài viết.' });
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
        try {
            await api.delete(`/v1/articles/${id}`);
            toast({ title: 'Thành công', description: 'Đã xóa bài viết.' });
            setArticles(articles.filter(a => a.id !== id));
        } catch (error) {
            toast({ variant: 'destructive', title: 'Lỗi', description: 'Lỗi khi xóa bài viết.' });
        }
    };

    if (loading) return <div>Đang tải dữ liệu...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Quản lý Tin tức</h1>
                <Button onClick={openCreateForm}><Plus className="w-4 h-4 mr-2" /> Viết bài mới</Button>
            </div>

            {/* Form Overlay (Hiển thị khi bấm Thêm/Sửa) */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background w-full max-w-2xl rounded-xl shadow-xl flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-bold">{editingId ? 'Cập nhật bài viết' : 'Viết bài mới'}</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
                            <div className="space-y-2">
                                <Label>Tiêu đề bài viết</Label>
                                <Input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Nhập tiêu đề..." />
                            </div>
                            <div className="space-y-2">
                                <Label>Ảnh thu nhỏ (URL)</Label>
                                <Input value={formData.thumbnailUrl} onChange={e => setFormData({ ...formData, thumbnailUrl: e.target.value })} placeholder="https://example.com/image.jpg" />
                            </div>
                            <div className="space-y-2">
                                <Label>Nội dung chi tiết</Label>
                                <Textarea required value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} rows={12} placeholder="Nội dung bài viết..." />
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Hủy</Button>
                                <Button type="submit">Lưu bài viết</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Bảng danh sách tin tức */}
            <div className="rounded-xl border bg-card overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 border-b">
                        <tr>
                            <th className="p-4 font-medium">Hình ảnh</th>
                            <th className="p-4 font-medium">Tiêu đề</th>
                            <th className="p-4 font-medium">Ngày đăng</th>
                            <th className="p-4 font-medium text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.length === 0 ? (
                            <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Chưa có bài viết nào.</td></tr>
                        ) : articles.map(article => (
                            <tr key={article.id} className="border-b last:border-0 hover:bg-muted/20">
                                <td className="p-4 w-24">
                                    {article.thumbnailUrl ? <img src={article.thumbnailUrl} alt="thumb" className="w-16 h-12 object-cover rounded" /> : <div className="w-16 h-12 bg-muted rounded" />}
                                </td>
                                <td className="p-4 font-medium">{article.title}</td>
                                <td className="p-4 text-muted-foreground">{new Date(article.createdAt).toLocaleDateString('vi-VN')}</td>
                                <td className="p-4 text-right">
                                    <Button variant="ghost" size="icon" onClick={() => openEditForm(article)}><Edit className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}