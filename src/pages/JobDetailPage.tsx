import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, DollarSign, Briefcase, Star, Send, UserCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';

export default function JobDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [job, setJob] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // State form đánh giá
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // 1. Tải chi tiết Job
        const jobRes = await api.get(`/v1/jobs/${id}`);
        setJob(jobRes.data);

        // 2. Tải danh sách Review
        // 🚀 ĐÃ SỬA URL THÀNH /jobreviews (VIẾT LIỀN)
        const reviewRes = await api.get(`/v1/jobreviews/job/${id}`);
        setReviews(reviewRes.data || []);
      } catch (error) {
        console.error('Lỗi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const submitReview = async () => {
    if (!user) {
      return toast({ variant: "destructive", title: "Lỗi", description: "Bạn cần đăng nhập để đánh giá." });
    }
    if (user.role !== 'CANDIDATE') {
      return toast({ variant: "destructive", title: "Lỗi", description: "Chỉ ứng viên mới có thể đánh giá." });
    }
    if (!comment.trim()) {
      return toast({ variant: "destructive", title: "Lỗi", description: "Vui lòng nhập nội dung đánh giá." });
    }

    try {
      // 🚀 ĐÃ SỬA URL THÀNH /jobreviews (VIẾT LIỀN)
      await api.post('/v1/jobreviews', {
        jobId: Number(id),
        rating: rating,
        comment: comment
      });

      toast({ title: "Thành công", description: "Đã gửi đánh giá của bạn!" });
      setComment('');

      // Tải lại danh sách review để hiện comment mới nhất
      const reviewRes = await api.get(`/v1/jobreviews/job/${id}`);
      setReviews(reviewRes.data || []);

    } catch (error: any) {
      toast({ variant: "destructive", title: "Lỗi", description: error.response?.data?.message || "Không thể gửi đánh giá." });
    }
  };

  if (loading) return <div className="text-center py-20">Đang tải dữ liệu...</div>;
  if (!job) return <div className="text-center py-20">Không tìm thấy công việc!</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-12 pt-6">
      <div className="container mx-auto max-w-4xl px-4 space-y-6">

        <Link to="/jobs" className="inline-flex items-center text-primary hover:underline font-medium mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách
        </Link>

        {/* Khối Thông tin chung */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-24 h-24 rounded-xl border bg-slate-50 flex items-center justify-center shrink-0">
              {job.company?.logoUrl ? (
                <img src={job.company.logoUrl} alt="Logo" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <Briefcase className="w-10 h-10 text-slate-300" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-800">{job.title}</h1>
              <p className="text-lg text-primary font-medium mt-1">{job.company?.companyName}</p>
            </div>
            <Button size="lg" className="w-full md:w-auto h-12 px-8 text-lg">Ứng tuyển ngay</Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t">
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1"><DollarSign className="w-4 h-4" /> Mức lương</p>
              <p className="font-semibold text-slate-800 mt-1">{job.salaryMin} - {job.salaryMax} Tr</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-4 h-4" /> Địa điểm</p>
              <p className="font-semibold text-slate-800 mt-1">{job.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1"><Briefcase className="w-4 h-4" /> Hình thức</p>
              <p className="font-semibold text-slate-800 mt-1">{job.employmentType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1"><Star className="w-4 h-4" /> Kinh nghiệm</p>
              <p className="font-semibold text-slate-800 mt-1">{job.experienceLevel}</p>
            </div>
          </div>
        </div>

        {/* Khối Chi tiết */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm space-y-8">
          <div>
            <h3 className="text-xl font-bold border-b pb-2 mb-4">Mô tả công việc</h3>
            <div className="text-slate-600 whitespace-pre-wrap leading-relaxed">{job.description}</div>
          </div>
          <div>
            <h3 className="text-xl font-bold border-b pb-2 mb-4">Yêu cầu ứng viên</h3>
            <div className="text-slate-600 whitespace-pre-wrap leading-relaxed">{job.requirements}</div>
          </div>
        </div>

        {/* KHU VỰC BÌNH LUẬN & ĐÁNH GIÁ */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-bold border-b pb-2 mb-6">Đánh giá & Bình luận ({reviews.length})</h3>

          {/* Form viết bình luận */}
          <div className="bg-slate-50 p-5 rounded-xl mb-8 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-medium text-sm">Chất lượng:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 cursor-pointer transition-colors ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            <div className="relative">
              <Textarea
                placeholder="Chia sẻ trải nghiệm phỏng vấn hoặc thắc mắc của bạn về vị trí này..."
                className="min-h-[100px] pb-12 resize-none bg-white"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button size="sm" className="absolute bottom-3 right-3" onClick={submitReview}>
                <Send className="w-4 h-4 mr-2" /> Gửi đánh giá
              </Button>
            </div>
          </div>

          {/* Danh sách bình luận */}
          <div className="space-y-5">
            {reviews.length === 0 ? (
              <p className="text-center text-muted-foreground py-4 italic">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
            ) : (
              reviews.map((rv: any) => (
                <div key={rv.id} className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <UserCircle2 className="w-10 h-10 text-slate-400 shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800">
                        {rv.user?.fullName || "Người dùng ẩn danh"}
                        {rv.user?.role === 'CANDIDATE' && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Ứng viên</span>}
                      </span>
                      <span className="text-xs text-muted-foreground">{new Date(rv.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rv.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{rv.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}