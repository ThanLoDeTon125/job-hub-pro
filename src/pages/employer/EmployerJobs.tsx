import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import api from '@/lib/api';

export default function EmployerJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // State quản lý Form (Thêm / Sửa)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '', location: '', salaryMin: '', salaryMax: '',
    employmentType: 'FULL-TIME', experienceLevel: 'JUNIOR',
    description: '', requirements: '', status: 'ACTIVE'
  });

  const fetchMyJobs = async () => {
    try {
      // Gọi API lấy việc làm của Công ty đang đăng nhập (API vừa sửa ở Backend)
      const response = await api.get('/v1/jobs/my-jobs');
      setJobs(response.data || []);
    } catch (error) {
      console.error('Lỗi tải danh sách việc làm', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setFormData({
      title: '', location: '', salaryMin: '', salaryMax: '',
      employmentType: 'FULL-TIME', experienceLevel: 'JUNIOR',
      description: '', requirements: '', status: 'ACTIVE'
    });
    setIsFormOpen(true);
  };

  const openEditForm = async (id: number) => {
    try {
      const response = await api.get(`/v1/jobs/${id}`);
      const job = response.data;
      setEditingId(job.id);
      setFormData({
        title: job.title || '', location: job.location || '',
        salaryMin: job.salaryMin || '', salaryMax: job.salaryMax || '',
        employmentType: job.employmentType || 'FULL-TIME',
        experienceLevel: job.experienceLevel || 'JUNIOR',
        description: job.description || '', requirements: job.requirements || '',
        status: job.status || 'ACTIVE'
      });
      setIsFormOpen(true);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: 'Không tải được dữ liệu công việc.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ép kiểu dữ liệu Lương từ Chuỗi (String) sang Số (Number) để Backend không từ chối
    const payload = {
      ...formData,
      salaryMin: formData.salaryMin ? Number(formData.salaryMin) : null,
      salaryMax: formData.salaryMax ? Number(formData.salaryMax) : null
    };

    try {
      if (editingId) {
        await api.put(`/v1/jobs/${editingId}`, payload);
        toast({ title: 'Thành công', description: 'Đã cập nhật tin tuyển dụng.' });
      } else {
        await api.post('/v1/jobs', payload);
        toast({ title: 'Thành công', description: 'Đã đăng tin tuyển dụng mới.' });
      }
      setIsFormOpen(false);
      fetchMyJobs(); // Load lại danh sách sau khi lưu
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Không thể lưu tin tuyển dụng.';
      toast({ variant: 'destructive', title: 'Lỗi', description: errorMsg });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tin này? Dữ liệu không thể khôi phục.')) return;
    try {
      await api.delete(`/v1/jobs/${id}`);
      toast({ title: 'Thành công', description: 'Đã xóa tin tuyển dụng.' });
      setJobs(jobs.filter(j => j.id !== id));
    } catch (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: 'Lỗi khi xóa tin.' });
    }
  };

  if (loading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quản lý tin tuyển dụng</h1>
          <p className="text-muted-foreground text-sm mt-1">Đăng và chỉnh sửa các vị trí đang tuyển</p>
        </div>
        {/* NÚT TẠO TIN ĐÃ ĐƯỢC GẮN SỰ KIỆN onClick */}
        <Button onClick={openCreateForm}><Plus className="w-4 h-4 mr-2" /> Tạo tin mới</Button>
      </div>

      {/* FORM POPUP (Chỉ hiện khi isFormOpen = true) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background w-full max-w-3xl rounded-xl shadow-xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingId ? 'Chỉnh sửa tin' : 'Đăng tin tuyển dụng mới'}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsFormOpen(false)}>✕</Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
              <div className="space-y-2">
                <Label>Tiêu đề công việc</Label>
                <Input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="VD: Senior ReactJS Developer" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Địa điểm</Label>
                  <Input required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="VD: Hà Nội, TP.HCM" />
                </div>
                <div className="space-y-2">
                  <Label>Lương tối thiểu (Tr VNĐ)</Label>
                  <Input type="number" required value={formData.salaryMin} onChange={e => setFormData({ ...formData, salaryMin: e.target.value })} placeholder="VD: 15" />
                </div>
                <div className="space-y-2">
                  <Label>Lương tối đa (Tr VNĐ)</Label>
                  <Input type="number" required value={formData.salaryMax} onChange={e => setFormData({ ...formData, salaryMax: e.target.value })} placeholder="VD: 30" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hình thức làm việc</Label>
                  <Select value={formData.employmentType} onValueChange={(val) => setFormData({ ...formData, employmentType: val })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FULL-TIME">Toàn thời gian (Full-time)</SelectItem>
                      <SelectItem value="PART-TIME">Bán thời gian (Part-time)</SelectItem>
                      <SelectItem value="REMOTE">Làm từ xa (Remote)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Cấp độ kinh nghiệm</Label>
                  <Select value={formData.experienceLevel} onValueChange={(val) => setFormData({ ...formData, experienceLevel: val })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INTERN">Thực tập sinh (Intern)</SelectItem>
                      <SelectItem value="FRESHER">Mới tốt nghiệp (Fresher)</SelectItem>
                      <SelectItem value="JUNIOR">Nhân viên (Junior)</SelectItem>
                      <SelectItem value="MIDDLE">Chuyên viên (Middle)</SelectItem>
                      <SelectItem value="SENIOR">Chuyên gia (Senior)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Mô tả công việc</Label>
                <Textarea required rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="- Thực hiện các công việc..." />
              </div>
              <div className="space-y-2">
                <Label>Yêu cầu ứng viên</Label>
                <Textarea required rows={4} value={formData.requirements} onChange={e => setFormData({ ...formData, requirements: e.target.value })} placeholder="- Tốt nghiệp đại học..." />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Hủy</Button>
                <Button type="submit">Lưu tin tuyển dụng</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DANH SÁCH TIN TUYỂN DỤNG CỦA CÔNG TY */}
      <div className="grid gap-4 mt-6">
        {jobs.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-xl bg-muted/30">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-medium text-foreground">Chưa có tin tuyển dụng nào</h3>
            <p className="text-muted-foreground mb-4">Bắt đầu thu hút nhân tài bằng cách tạo tin tuyển dụng đầu tiên.</p>
            <Button onClick={openCreateForm}>Tạo tin ngay</Button>
          </div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="bg-card border rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow transition-shadow">
              <div>
                <h3 className="font-bold text-lg text-primary">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {job.salaryMin} - {job.salaryMax} Tr</span>
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">{job.employmentType}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${job.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {job.status === 'ACTIVE' ? 'Đang tuyển' : 'Đã đóng'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditForm(job.id)}><Edit className="w-4 h-4 mr-2" /> Sửa</Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(job.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}