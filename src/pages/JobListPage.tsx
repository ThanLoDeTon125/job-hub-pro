import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, DollarSign, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton từ thư viện của bạn
import api from '@/lib/api';

export default function JobListPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const fetchJobs = async (searchKw = '', searchLoc = '') => {
    setLoading(true);
    try {
      const res = await api.get('/v1/jobs', {
        params: { keyword: searchKw, location: searchLoc }
      });
      setJobs(res.data || []);
    } catch (error) {
      console.error('Lỗi tải danh sách việc làm:', error);
    } finally {
      // Giả lập mạng chậm 0.5s để bạn ngắm được hiệu ứng Skeleton siêu mượt
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(keyword, location);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      {/* HEADER TÌM KIẾM - Đã tinh chỉnh shadow và bo góc mượt hơn */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-5xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Khám phá cơ hội nghề nghiệp</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">Hàng ngàn công việc IT, Marketing, Tài chính... mới được cập nhật mỗi ngày từ các công ty hàng đầu.</p>

          <form onSubmit={handleSearch} className="bg-background p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto mt-8 border border-white/20">
            <div className="flex-1 relative flex items-center">
              <Search className="absolute left-4 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Tên công việc, vị trí, kỹ năng..."
                className="pl-12 h-14 border-0 shadow-none text-foreground focus-visible:ring-0 text-base bg-transparent"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
              />
            </div>
            <div className="hidden md:block w-[1px] bg-border my-3"></div>
            <div className="flex-1 relative flex items-center border-t md:border-0">
              <MapPin className="absolute left-4 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Tất cả địa điểm..."
                className="pl-12 h-14 border-0 shadow-none text-foreground focus-visible:ring-0 text-base bg-transparent"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="h-14 px-8 rounded-xl md:rounded-full text-base font-semibold shrink-0 transition-transform active:scale-95">
              Tìm việc ngay
            </Button>
          </form>
        </div>
      </div>

      {/* DANH SÁCH CÔNG VIỆC */}
      <div className="container mx-auto max-w-5xl px-4 mt-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Việc làm mới nhất</h2>
            <p className="text-muted-foreground text-sm mt-1">Tìm thấy {jobs.length} kết quả phù hợp với bạn.</p>
          </div>
        </div>

        {/* HIỆU ỨNG SKELETON LOADING THAY CHO TEXT THƯỜNG */}
        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="bg-card border rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center">
                <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
                <div className="flex-1 space-y-3 w-full">
                  <Skeleton className="h-6 w-3/4 md:w-1/2" />
                  <Skeleton className="h-4 w-1/2 md:w-1/3" />
                  <div className="flex gap-2 mt-3">
                    <Skeleton className="h-8 w-24 rounded-md" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </div>
                </div>
                <div className="w-full md:w-auto mt-4 md:mt-0">
                  <Skeleton className="h-10 w-full md:w-32 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-dashed shadow-sm flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <Briefcase className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Không tìm thấy công việc nào</h3>
            <p className="text-muted-foreground mt-2 max-w-md">Thử thay đổi từ khóa tìm kiếm hoặc bỏ trống địa điểm để xem nhiều kết quả hơn nhé.</p>
            <Button variant="outline" className="mt-6" onClick={() => { setKeyword(''); setLocation(''); fetchJobs(); }}>Xóa bộ lọc</Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map(job => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="block group">
                <div className="bg-card border rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:border-primary/50 flex flex-col md:flex-row gap-5 items-start md:items-center hover:-translate-y-0.5">

                  {/* Logo Công ty */}
                  <div className="w-16 h-16 rounded-xl border bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                    {job.company?.logoUrl ? (
                      <img src={job.company.logoUrl} alt="Logo" className="w-full h-full object-contain p-1" />
                    ) : (
                      <Briefcase className="w-8 h-8 text-slate-300" />
                    )}
                  </div>

                  {/* Thông tin chính */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">{job.company?.companyName}</p>

                    <div className="flex flex-wrap items-center gap-2 mt-3 text-sm text-slate-600">
                      <span className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-md font-medium">
                        <MapPin className="w-4 h-4 text-slate-500" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md font-bold">
                        <DollarSign className="w-4 h-4 text-emerald-600" /> {job.salaryMin} - {job.salaryMax} Tr
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md font-medium">
                        {job.employmentType}
                      </span>
                    </div>
                  </div>

                  {/* Nút Ứng tuyển */}
                  <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-3 mt-2 md:mt-0">
                    <Button variant="ghost" className="md:w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors hidden md:flex">
                      Chi tiết <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                    <span className="text-xs text-muted-foreground font-medium">
                      Đăng ngày: {new Date(job.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}