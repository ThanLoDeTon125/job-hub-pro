import { useState, useEffect } from 'react';
import { Search, ArrowRight, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import api from '@/lib/api';

const HomePage = () => {
  const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([]); // Thêm state cho Tin tức
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy việc làm
        const jobRes = await api.get('/v1/jobs?pageSize=9');
        setFeaturedJobs(jobRes.data.Data?.slice(0, 9) || jobRes.data?.slice(0, 9) || []);

        // Lấy tin tức mới nhất
        const articleRes = await api.get('/v1/articles');
        setFeaturedArticles(articleRes.data.Data?.slice(0, 3) || articleRes.data?.slice(0, 3) || []);
      } catch (error) {
        console.error("Lỗi tải dữ liệu trang chủ", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (searchTerm) navigate(`/jobs?keyword=${searchTerm}`);
    else navigate('/jobs');
  };

  return (
    <div className="bg-muted/30">
      {/* ... (Giữ nguyên Hero Section của bạn) ... */}
      <section className="bg-white pt-16 pb-24 border-b border-border relative overflow-hidden">
        {/* ... Code Hero Section ... */}
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight animate-fade-in leading-[1.1]">
            Tìm việc làm nhanh chóng,<br />
            <span className="text-primary">Tuyển dụng hiệu quả</span>
          </h1>
          {/* ... (Giữ nguyên form search) ... */}
          <div className="bg-white p-2 rounded-2xl shadow-elevated border border-border flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto animate-fade-in relative z-20">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Tên công việc..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className="pl-12 h-14 bg-transparent border-0 ring-0 shadow-none text-base" />
            </div>
            <Button size="lg" className="h-14 px-8 text-base rounded-xl w-full sm:w-auto mt-2 sm:mt-0" onClick={handleSearch}>Tìm việc ngay</Button>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 container">
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Việc làm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Hấp dẫn</span></h2>
          </div>
          <Button variant="outline" asChild><Link to="/jobs" className="gap-2">Xem tất cả <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <div key={job.id} className="border p-4 rounded shadow bg-white">
              <h3 className="font-bold text-lg">{job.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{job.company?.companyName}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                <span className="text-blue-600 font-medium">{job.salaryMin} - {job.salaryMax} tr</span>
              </div>
              <Button className="w-full mt-4" variant="outline" asChild><Link to={`/jobs/${job.id}`}>Xem chi tiết</Link></Button>
            </div>
          ))}
        </div>
      </section>

      {/* THÊM MỚI: Tin tức nổi bật */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Cẩm nang <span className="text-primary">Nghề nghiệp</span></h2>
              <p className="text-muted-foreground">Kinh nghiệm phỏng vấn và thăng tiến</p>
            </div>
            <Button variant="outline" asChild><Link to="/articles" className="gap-2">Đọc thêm <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredArticles.map((article) => (
              <div key={article.id} className="border rounded-xl overflow-hidden shadow-sm flex flex-col group cursor-pointer">
                <div className="h-48 bg-muted overflow-hidden">
                  {article.thumbnailUrl ? <img src={article.thumbnailUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> : <div className="w-full h-full flex items-center justify-center">No Image</div>}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(article.createdAt).toLocaleDateString('vi-VN')}</p>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h3>
                  <Button variant="link" className="mt-auto p-0 h-auto justify-start" asChild><Link to={`/articles/${article.id}`}>Xem chi tiết &rarr;</Link></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;