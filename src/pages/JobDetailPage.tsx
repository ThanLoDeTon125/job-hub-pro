import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Banknote, Building2, ArrowLeft, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import api from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const JobDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth(); // Lấy user hiện tại để check quyền
  const [job, setJob] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]); // State chứa đánh giá
  const [loading, setLoading] = useState(true);

  // Form Review
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const fetchJobAndReviews = async () => {
    try {
      const [jobRes, reviewRes] = await Promise.all([
        api.get(`/v1/jobs/${id}`),
        api.get(`/v1/job-reviews/job/${id}`) // API lấy reviews
      ]);
      setJob(jobRes.data);
      setReviews(reviewRes.data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchJobAndReviews();
  }, [id]);

  const handleApply = async () => {
    try {
      await api.post('/v1/applications', { jobId: job.id });
      toast({ title: "Thành công", description: "Đã nộp đơn ứng tuyển!" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Lỗi", description: error.response?.data?.message || "Không thể ứng tuyển" });
    }
  };

  // Nộp đánh giá
  const submitReview = async () => {
    if (!comment.trim()) return toast({ variant: "destructive", title: "Lỗi", description: "Vui lòng nhập nội dung đánh giá." });
    try {
      await api.post('/v1/job-reviews', { jobId: job.id, rating, comment });
      toast({ title: "Thành công", description: "Cảm ơn bạn đã đánh giá!" });
      setComment('');
      fetchJobAndReviews(); // Tải lại danh sách review
    } catch (error: any) {
      toast({ variant: "destructive", title: "Lỗi", description: error.response?.data?.message || "Lỗi khi gửi đánh giá" });
    }
  };

  if (loading) return <div className="py-16 text-center">Đang tải...</div>;
  if (!job) return <div className="text-center py-16"><p>Không tìm thấy công việc.</p></div>;

  return (
    <div className="py-8 container max-w-4xl">
      <Button variant="ghost" asChild className="mb-6"><Link to="/jobs"><ArrowLeft className="h-4 w-4 mr-2" />Quay lại</Link></Button>

      {/* KHỐI THÔNG TIN CÔNG VIỆC (Giữ nguyên của bạn) */}
      <div className="rounded-xl border bg-card p-6 shadow-card">
        {/* ... (Code hiển thị tiêu đề, công ty, ứng tuyển của bạn) ... */}
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
            {job.company?.logoUrl ? <img src={job.company.logoUrl} alt="logo" className="w-full h-full object-cover rounded-xl" /> : <Building2 className="h-8 w-8 text-muted-foreground" />}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-muted-foreground mt-1">{job.company?.companyName}</p>
            <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
              <span className="flex items-center gap-1"><Banknote className="h-3.5 w-3.5" />{job.salaryMin} - {job.salaryMax} tr</span>
            </div>
          </div>
        </div>
        <Button size="lg" className="mt-6" onClick={handleApply}>Ứng tuyển ngay</Button>
      </div>

      <div className="mt-6 rounded-xl border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold mb-3">Mô tả & Yêu cầu</h2>
        <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
      </div>

      {/* THÊM MỚI: KHU VỰC ĐÁNH GIÁ (REVIEWS) */}
      <div className="mt-6 rounded-xl border bg-card p-6 shadow-card">
        <h2 className="text-xl font-bold mb-6 border-b pb-4">Đánh giá về công việc này ({reviews.length})</h2>

        {/* Form gửi đánh giá (Chỉ ứng viên mới được đánh giá) */}
        {user?.role === 'CANDIDATE' ? (
          <div className="mb-8 bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Viết đánh giá của bạn</h3>
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <Textarea placeholder="Chia sẻ trải nghiệm phỏng vấn hoặc suy nghĩ của bạn..." value={comment} onChange={e => setComment(e.target.value)} className="mb-3 bg-white" />
            <Button onClick={submitReview}>Gửi đánh giá</Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-8 italic">Bạn cần đăng nhập với tư cách Ứng viên để viết đánh giá.</p>
        )}

        {/* Danh sách các đánh giá */}
        <div className="space-y-4">
          {reviews.length === 0 ? <p className="text-center text-muted-foreground">Chưa có đánh giá nào.</p> : null}
          {reviews.map(review => (
            <div key={review.id} className="border-b pb-4 last:border-0">
              <div className="flex justify-between mb-1">
                <span className="font-semibold">{review.candidate?.fullName || 'Ứng viên ẩn danh'}</span>
                <span className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className={`w-3 h-3 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className="text-sm text-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
export default JobDetailPage;