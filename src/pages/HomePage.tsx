import { useState, useEffect } from 'react';
import { Search, ArrowRight, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import JobCard from '@/components/JobCard';
import { Link, useNavigate } from 'react-router-dom';
import api from '@/lib/api';

const HomePage = () => {
  const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/v1/jobs?pageSize=9');
        const jobsData = res.data.Data || res.data || [];
        // Lấy tối đa 9 job mới nhất
        setFeaturedJobs(jobsData.slice(0, 9));
      } catch (error) {
        console.error("Lỗi tải việc làm nổi bật", error);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = () => {
    if (searchTerm) navigate(`/jobs?keyword=${searchTerm}`);
    else navigate('/jobs');
  };

  return (
    <div className="bg-muted/30">
      {/* Hero Section */}
      <section className="bg-white pt-16 pb-24 border-b border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary/20 blur-3xl" />
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight animate-fade-in leading-[1.1]">
            Tìm việc làm nhanh chóng,<br />
            <span className="text-primary">Tuyển dụng hiệu quả</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto animate-fade-in">
            Tiếp cận hàng ngàn công việc IT, Kế toán, Kinh doanh, Marketing trên toàn quốc.
          </p>

          <div className="bg-white p-2 rounded-2xl shadow-elevated border border-border flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto animate-fade-in relative z-20">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Tên công việc, vị trí, kỹ năng..."
                className="pl-12 h-14 bg-transparent border-0 ring-0 focus-visible:ring-0 text-base shadow-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="hidden sm:block w-px h-10 bg-border self-center" />
            <div className="relative sm:w-1/3 flex items-center border-t sm:border-t-0 border-border">
              <MapPin className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Tất cả địa điểm" className="pl-12 h-14 bg-transparent border-0 ring-0 focus-visible:ring-0 text-base shadow-none" />
            </div>
            <Button size="lg" className="h-14 px-8 text-base rounded-xl w-full sm:w-auto mt-2 sm:mt-0" onClick={handleSearch}>
              Tìm việc ngay
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 md:py-24 container">
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Việc làm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Hấp dẫn</span></h2>
            <p className="text-muted-foreground">Những cơ hội việc làm tốt nhất được cập nhật mỗi ngày</p>
          </div>
          <Button variant="outline" className="border-border hover:bg-primary/5 hover:text-primary" asChild>
            <Link to="/jobs" className="gap-2">Xem tất cả <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <div key={job.id} className="border p-4 rounded shadow bg-white">
              <h3 className="font-bold text-lg">{job.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{job.company?.companyName || 'Công ty ẩn danh'}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                <span className="text-blue-600 font-medium">{job.salaryMin} - {job.salaryMax} tr</span>
              </div>
              <Button className="w-full mt-4" variant="outline" asChild>
                <Link to={`/jobs/${job.id}`}>Xem chi tiết</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default HomePage;