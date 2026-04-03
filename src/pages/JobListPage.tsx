import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';

export default function JobListPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // State cho bộ lọc tìm kiếm
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  // Hàm gọi API lấy danh sách việc làm từ Backend C#
  const fetchJobs = async (searchKw = '', searchLoc = '') => {
    setLoading(true);
    try {
      const res = await api.get('/v1/jobs', {
        params: { keyword: searchKw, location: searchLoc }
      });
      // Set dữ liệu lấy được vào State
      setJobs(res.data || []);
    } catch (error) {
      console.error('Lỗi tải danh sách việc làm:', error);
    } finally {
      setLoading(false);
    }
  };

  // Tự động chạy lần đầu tiên khi mở trang
  useEffect(() => {
    fetchJobs();
  }, []);

  // Khi người dùng bấm nút Tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(keyword, location);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* HEADER TÌM KIẾM */}
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-5xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Khám phá cơ hội nghề nghiệp</h1>
          <p className="text-lg opacity-90">Hàng ngàn công việc mới được cập nhật mỗi ngày từ các công ty hàng đầu</p>

          <form onSubmit={handleSearch} className="bg-white p-2 rounded-xl md:rounded-full shadow-lg flex flex-col md:flex-row gap-2 max-w-4xl mx-auto mt-8">
            <div className="flex-1 relative flex items-center">
              <Search className="absolute left-4 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Tên công việc, vị trí..."
                className="pl-12 h-14 border-0 shadow-none text-black focus-visible:ring-0 text-base"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
              />
            </div>
            <div className="hidden md:block w-[1px] bg-slate-200 my-2"></div>
            <div className="flex-1 relative flex items-center border-t md:border-0">
              <MapPin className="absolute left-4 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Địa điểm làm việc..."
                className="pl-12 h-14 border-0 shadow-none text-black focus-visible:ring-0 text-base"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="h-14 px-8 rounded-lg md:rounded-full text-base shrink-0">
              Tìm việc ngay
            </Button>
          </form>
        </div>
      </div>

      {/* DANH SÁCH CÔNG VIỆC */}
      <div className="container mx-auto max-w-5xl px-4 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Việc làm mới nhất</h2>
          <span className="text-muted-foreground">{jobs.length} kết quả</span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            Đang tải dữ liệu việc làm...
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed shadow-sm">
            <Briefcase className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-700">Chưa có công việc nào</h3>
            <p className="text-muted-foreground mt-2">Thử thay đổi từ khóa tìm kiếm hoặc quay lại sau nhé.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map(job => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="block group">
                <div className="bg-white border rounded-xl p-5 hover:shadow-md transition-all hover:border-primary/40 flex flex-col md:flex-row gap-5 items-start md:items-center">

                  {/* Logo Công ty */}
                  <div className="w-16 h-16 rounded-xl border bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
                    {job.company?.logoUrl ? (
                      <img src={job.company.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <Briefcase className="w-8 h-8 text-slate-300" />
                    )}
                  </div>

                  {/* Thông tin chính */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">{job.company?.companyName || 'Công ty bảo mật danh tính'}</p>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-600">
                      <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                        <MapPin className="w-4 h-4" /> {job.location || 'Toàn quốc'}
                      </span>
                      <span className="flex items-center gap-1 bg-green-50 text-green-700 font-medium px-2.5 py-1 rounded-md">
                        <DollarSign className="w-4 h-4" /> {job.salaryMin} - {job.salaryMax} Tr
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-medium">
                        {job.employmentType}
                      </span>
                    </div>
                  </div>

                  {/* Nút Ứng tuyển & Thời gian */}
                  <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-3 mt-2 md:mt-0">
                    <Button variant="default" className="md:w-full group-hover:bg-primary/90">Xem chi tiết</Button>
                    <span className="text-xs text-muted-foreground">
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