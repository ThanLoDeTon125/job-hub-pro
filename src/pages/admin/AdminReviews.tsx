import { useState, useEffect } from 'react';
import { Trash2, Star, MessageSquareWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import api from '@/lib/api';

export default function AdminReviews() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            // Gọi API lấy toàn bộ đánh giá trong hệ thống
            const response = await api.get('/v1/job-reviews');
            setReviews(response.data || []);
        } catch (error) {
            console.error('Lỗi tải danh sách đánh giá', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa đánh giá này khỏi hệ thống?')) return;

        try {
            await api.delete(`/v1/job-reviews/${id}`);
            toast({ title: 'Thành công', description: 'Đã xóa bình luận/đánh giá.' });
            setReviews(reviews.filter(r => r.id !== id));
        } catch (error) {
            toast({ variant: 'destructive', title: 'Lỗi', description: 'Không thể xóa bình luận này.' });
        }
    };

    if (loading) return <div className="p-8 text-center text-muted-foreground">Đang tải dữ liệu...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <MessageSquareWarning className="w-6 h-6 text-primary" /> Quản lý Đánh giá & Bình luận
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">Kiểm duyệt các phản hồi của ứng viên về tin tuyển dụng</p>
                </div>
            </div>

            <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 border-b">
                        <tr>
                            <th className="p-4 font-medium w-48">Người đánh giá</th>
                            <th className="p-4 font-medium min-w-[200px]">Công việc</th>
                            <th className="p-4 font-medium w-32">Mức độ</th>
                            <th className="p-4 font-medium">Nội dung</th>
                            <th className="p-4 font-medium w-32">Ngày tạo</th>
                            <th className="p-4 font-medium text-right w-24">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                    Chưa có đánh giá nào trong hệ thống.
                                </td>
                            </tr>
                        ) : reviews.map((review) => (
                            <tr key={review.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                                <td className="p-4 font-medium text-primary">
                                    {review.candidate?.fullName || 'Ứng viên ẩn danh'}
                                </td>
                                <td className="p-4 text-muted-foreground">
                                    {review.job?.title || `Mã công việc: ${review.jobId}`}
                                </td>
                                <td className="p-4">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star
                                                key={star}
                                                className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <p className="line-clamp-2" title={review.comment}>{review.comment}</p>
                                </td>
                                <td className="p-4 text-muted-foreground">
                                    {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="p-4 text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(review.id)}
                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                        title="Xóa bình luận"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}