import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { Article } from '@/types';

export default function ArticleListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/v1/articles');
        setArticles(response.data.Data || response.data || []);
      } catch (error) {
        console.error('Lỗi tải tin tức:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <div className="text-center py-20">Đang tải tin tức...</div>;

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Tin tức & Cẩm nang</h1>
        <p className="text-muted-foreground text-lg">Cập nhật xu hướng thị trường và bí quyết phát triển sự nghiệp</p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-10 border rounded-xl bg-muted/20">Chưa có bài viết nào.</div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id} className="border bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="aspect-video w-full bg-muted relative">
                {article.thumbnailUrl ? (
                  <img src={article.thumbnailUrl} alt={article.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground">No Image</div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3"/> {article.author?.email?.split('@')[0] || 'Admin'}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h2>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                  {article.content.replace(/<[^>]+>/g, '')} {/* Loại bỏ HTML tag nếu có */}
                </p>
                <Button variant="outline" asChild className="w-full mt-auto">
                  <Link to={`/articles/${article.id}`}>Đọc tiếp</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}