import { useState, useEffect } from 'react';
import { Mail, Phone, Briefcase, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import api from '@/lib/api';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface EmployerApplicantsProps {
  jobId?: number;
}

export default function EmployerApplicants({ jobId }: EmployerApplicantsProps) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [applicants, setApplicants] = useState<any[]>([]);

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApps, setLoadingApps] = useState(false);

  // 1. LẤY DANH SÁCH TIN TUYỂN DỤNG CỦA CÔNG TY ĐỂ TẠO DROPDOWN
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/v1/jobs/my-jobs');
        setJobs(res.data || []);
        // Tự động chọn tin tuyển dụng đầu tiên (nếu có)
        if (res.data && res.data.length > 0) {
          setSelectedJobId(res.data[0].id.toString());
        }
      } catch (error) {
        console.error('Lỗi tải danh sách việc làm:', error);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  // 2. KHI CHỌN 1 CÔNG VIỆC -> TẢI DANH SÁCH ỨNG VIÊN CỦA CÔNG VIỆC ĐÓ
  useEffect(() => {
    if (!selectedJobId) {
      setApplicants([]);
      return;
    }

    const fetchApplicants = async () => {
      setLoadingApps(true);
      try {
        const response = await api.get(`/v1/applications/job/${selectedJobId}`);
        setApplicants(response.data || []);
      } catch (error) {
        console.error('Lỗi tải ứng viên:', error);
        setApplicants([]);
      } finally {
        setLoadingApps(false);
      }
    };

    fetchApplicants();
  }, [selectedJobId]);

  // 3. HÀM CẬP NHẬT TRẠNG THÁI (DUYỆT ĐƠN)
  const handleUpdateStatus = async (applicationId: number, newStatus: string) => {
    try {
      await api.put(`/v1/applications/${applicationId}/status`, { status: newStatus });
      toast({ title: "Thành công", description: "Đã cập nhật trạng thái ứng viên." });

      // Cập nhật lại UI ngay lập tức
      setApplicants(prev => prev.map(app =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));
    } catch (error: any) {
      toast({ variant: "destructive", title: "Lỗi", description: error.response?.data?.message || "Không thể cập nhật." });
    }
  };

  if (loadingJobs) return <div className="p-6 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Quản lý Hồ sơ Ứng viên</h1>
        <p className="text-muted-foreground text-sm mt-1">Xem và duyệt các đơn ứng tuyển vào công ty của bạn</p>
      </div>

      {/* BỘ LỌC TÌM KIẾM (CHỌN CÔNG VIỆC) */}
      <div className="bg-card p-4 rounded-xl border shadow-sm flex items-center gap-4">
        <span className="font-semibold whitespace-nowrap">Chọn tin tuyển dụng:</span>
        <Select value={selectedJobId} onValueChange={setSelectedJobId}>
          <SelectTrigger className="w-full max-w-md bg-white">
            <SelectValue placeholder="-- Chọn công việc --" />
          </SelectTrigger>
          <SelectContent>
            {jobs.length === 0 ? (
              <SelectItem value="empty" disabled>Bạn chưa có tin tuyển dụng nào</SelectItem>
            ) : (
              jobs.map(job => (
                <SelectItem key={job.id} value={job.id.toString()}>{job.title}</SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* DANH SÁCH ỨNG VIÊN */}
      {loadingApps ? (
        <div className="text-center py-10">Đang tải hồ sơ ứng viên...</div>
      ) : applicants.length === 0 ? (
        <div className="text-center py-16 bg-muted/20 border border-dashed rounded-xl">
          <p className="text-muted-foreground">Chưa có ứng viên nào nộp đơn vào vị trí này.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applicants.map(app => (
            <div key={app.id} className="bg-card border rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4 shadow-sm hover:shadow transition-shadow">
              {/* Cột thông tin Ứng viên */}
              <div>
                <h3 className="font-bold text-lg text-primary">{app.candidate?.fullName || 'Ứng viên chưa cập nhật tên'}</h3>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> {app.candidate?.email}</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {app.candidate?.phone || 'Chưa có SĐT'}</p>
                  <p className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {app.candidate?.experienceYears} năm kinh nghiệm</p>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
                    Ngày nộp: {new Date(app.appliedAt).toLocaleDateString('vi-VN')}
                  </span>
                  <Link to={`/employer/applicants/${app.candidate?.id}`}>
                    <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10">
                      <FileText className="w-4 h-4 mr-2" /> Xem chi tiết Hồ sơ & CV
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Cột thao tác Trạng thái */}
              <div className="flex flex-col items-end justify-between min-w-[200px]">
                <div className="w-full">
                  <span className="text-xs font-semibold text-muted-foreground mb-1 block">Trạng thái duyệt:</span>
                  <Select value={app.status} onValueChange={(val) => handleUpdateStatus(app.id, val)}>
                    <SelectTrigger className={`w-full font-medium bg-white ${app.status === 'NEW' ? 'text-blue-600 border-blue-200' :
                      app.status === 'REVIEWING' ? 'text-yellow-600 border-yellow-200' :
                        app.status === 'INTERVIEWING' ? 'text-purple-600 border-purple-200' :
                          app.status === 'OFFERED' ? 'text-green-600 border-green-200' :
                            app.status === 'HIRED' ? 'text-teal-600 border-teal-200' : 'text-red-600 border-red-200'
                      }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW">Mới nộp (NEW)</SelectItem>
                      <SelectItem value="REVIEWING">Đang xem (REVIEWING)</SelectItem>
                      <SelectItem value="INTERVIEWING">Phỏng vấn (INTERVIEWING)</SelectItem>
                      <SelectItem value="OFFERED">Gửi Offer (OFFERED)</SelectItem>
                      <SelectItem value="HIRED">Đã nhận việc (HIRED)</SelectItem>
                      <SelectItem value="REJECTED">Từ chối (REJECTED)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}