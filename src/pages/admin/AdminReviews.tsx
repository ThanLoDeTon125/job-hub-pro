import { useState, useEffect } from 'react';
import { Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import api from '@/lib/api';

export default function AdminReviews() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const res = await api.get('/v1/jobreviews');
            setReviews(res.data || []);
        } catch (error) {
            console.error("Lỗi lấy danh sách bình luận:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?")) return;
        try {
            await api.delete(`/v1/jobreviews/${id}`);
            toast({ title: "Thành công", description: "Đã xóa bình luận vi phạm." });
            setReviews(reviews.filter(r => r.id !== id));
        } catch (error) {
            toast({ variant: "destructive", title: "Lỗi", description: "Không thể xóa bình luận." });
        }
    };

    if (loading) return <div className="p-10 text-center">Đang tải danh sách bình luận...</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Kiểm duyệt Bình luận</h1>
                <p className="text-muted-foreground text-sm mt-1">Quản lý và gỡ bỏ các đánh giá vi phạm tiêu chuẩn cộng đồng</p>
            </div>

            <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/50 border-b">
                                <th className="p-4 font-medium text-muted-foreground">Người đăng</th>
                                <th className="p-4 font-medium text-muted-foreground">Đánh giá Job</th>
                                <th className="p-4 font-medium text-muted-foreground min-w-[300px]">Nội dung</th>
                                <th className="p-4 font-medium text-muted-foreground text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {reviews.length === 0 ? (
                                <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Hệ thống chưa có bình luận nào.</td></tr>
                            ) : (
                                reviews.map((rv) => (
                                    <tr key={rv.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-4">
                                            <p className="font-bold text-slate-800">{rv.user?.fullName}</p>
                                            <p className="text-xs text-muted-foreground">{rv.user?.email}</p>
                                            <p className="text-xs mt-1 text-slate-400">{new Date(rv.createdAt).toLocaleDateString('vi-VN')}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm font-medium line-clamp-2 text-blue-600 mb-1">{rv.jobTitle}</p>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3.5 h-3.5 ${i < rv.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm text-slate-700 whitespace-pre-wrap">{rv.comment}</p>
                                        </td>
                                        <td className="p-4 text-center">
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(rv.id)}>
                                                <Trash2 className="w-4 h-4 mr-2" /> Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}