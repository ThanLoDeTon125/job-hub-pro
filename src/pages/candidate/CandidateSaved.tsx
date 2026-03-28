import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { MapPin, Banknote, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const CandidateSaved = () => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const meRes = await api.get('/v1/auth/me');
        const candidateId = meRes.data.candidateProfile?.id;

        if (candidateId) {
          const res = await api.get(`/v1/bookmarks?candidateId=${candidateId}`);
          setBookmarks(res.data);
        }
      } catch (error) {
        console.error('Lỗi tải việc làm đã lưu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, []);

  const handleRemoveBookmark = async (id: number) => {
    try {
      await api.delete(`/v1/bookmarks/${id}`);
      setBookmarks(bookmarks.filter(b => b.id !== id));
      toast({ title: 'Thành công', description: 'Đã bỏ lưu việc làm.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: 'Không thể xóa lúc này.' });
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Việc đã lưu</h1>
      {bookmarks.length === 0 ? (
        <p className="text-muted-foreground">Bạn chưa lưu việc làm nào.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {bookmarks.map(({ id, job }) => (
            <div key={id} className="border p-4 rounded-xl shadow-sm bg-white flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg">{job?.title}</h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {job?.location}</p>
                <p className="text-sm text-blue-600 font-medium mt-1 flex items-center gap-1"><Banknote className="h-3 w-3" /> {job?.salaryMin} - {job?.salaryMax} triệu</p>
              </div>
              <Button variant="outline" className="mt-4 w-full text-red-500 border-red-200 hover:bg-red-50" onClick={() => handleRemoveBookmark(id)}>
                Bỏ lưu
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateSaved;