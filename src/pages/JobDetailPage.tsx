import { useParams, Link } from 'react-router-dom';
import { MapPin, Banknote, Clock, Building2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { mockJobs } from '@/lib/mock-data';

const JobDetailPage = () => {
  const { id } = useParams();
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Không tìm thấy công việc.</p>
        <Button className="mt-4" asChild><Link to="/jobs">Quay lại</Link></Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/jobs"><ArrowLeft className="h-4 w-4 mr-2" />Quay lại</Link>
        </Button>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{job.title}</h1>
              <p className="text-muted-foreground mt-1">{job.company}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                <span className="flex items-center gap-1"><Banknote className="h-3.5 w-3.5" />{job.salary}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.postedAt}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary">{job.type}</Badge>
                <Badge variant="outline">{job.level}</Badge>
                {job.tags.map((t) => (
                  <Badge key={t} variant="outline">{t}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button size="lg" className="flex-1 sm:flex-none">Ứng tuyển ngay</Button>
            <Button size="lg" variant="outline">Lưu việc làm</Button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-3">Mô tả công việc</h2>
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground mb-3">Yêu cầu</h2>
              <ul className="space-y-2">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-semibold text-foreground mb-3">Phúc lợi</h3>
              <ul className="space-y-2">
                {job.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-semibold text-foreground mb-3">Thông tin thêm</h3>
              <Separator className="mb-3" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hạn nộp</span>
                  <span className="text-foreground font-medium">{job.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cấp bậc</span>
                  <span className="text-foreground font-medium">{job.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
