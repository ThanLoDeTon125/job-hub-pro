import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { Article } from '@/types';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/v1/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Lỗi tải bài viết:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchArticle();
  }, [id]);

  if (loading) return <div className="text-center py-20">Đang tải bài viết...</div>;
  if (!article) return <div className="text-center py-20">Không tìm thấy bài viết.</div>;

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/articles"><ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách</Link>
      </Button>

      <article className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        {article.thumbnailUrl && (
          <div className="w-full max-h-[400px] overflow-hidden bg-muted">
            <img src={article.thumbnailUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6 border-b pb-6">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
            <span className="flex items-center gap-2"><User className="w-4 h-4"/> Tác giả: {article.author?.email?.split('@')[0] || 'Admin'}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">{article.title}</h1>
          
          {/* whitespace-pre-wrap giúp giữ nguyên các dấu xuống dòng */}
          <div className="prose max-w-none text-foreground whitespace-pre-wrap leading-relaxed">
            {article.content}
          </div>
        </div>
      </article>
    </div>
  );
}