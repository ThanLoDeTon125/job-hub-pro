import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Banknote, Clock, Building2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import api from '@/lib/api';
import { toast } from '@/hooks/use-toast';

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/v1/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Lỗi lấy chi tiết Job:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      await api.post('/v1/applications', { jobId: job.id });
      toast({ title: "Thành công", description: "Đã nộp đơn ứng tuyển!" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Lỗi", description: error.response?.data?.message || "Không thể ứng tuyển" });
    }
  };

  if (loading) return <div className="py-16 text-center">Đang tải...</div>;
  if (!job) return (
    <div className="container py-16 text-center">
      <p className="text-muted-foreground">Không tìm thấy công việc.</p>
      <Button className="mt-4" asChild><Link to="/jobs">Quay lại</Link></Button>
    </div>
  );

  return (
    <div className="py-8 container max-w-4xl">
      <Button variant="ghost" asChild className="mb-6"><Link to="/jobs"><ArrowLeft className="h-4 w-4 mr-2" />Quay lại</Link></Button>
      <div className="rounded-xl border bg-card p-6 shadow-card">
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
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="secondary">{job.employmentType}</Badge>
              <Badge variant="outline">{job.experienceLevel}</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button size="lg" className="flex-1 sm:flex-none" onClick={handleApply}>Ứng tuyển ngay</Button>
        </div>
      </div>
      <div className="mt-6 rounded-xl border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold mb-3">Mô tả công việc</h2>
        <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
        <h2 className="text-lg font-semibold mt-6 mb-3">Yêu cầu</h2>
        <p className="text-muted-foreground whitespace-pre-line">{job.requirements}</p>
      </div>
    </div>
  );
};
export default JobDetailPage;