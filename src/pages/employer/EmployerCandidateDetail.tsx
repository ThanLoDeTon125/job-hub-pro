import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, FileText, Download, UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

export default function EmployerCandidateDetail() {
    const { id } = useParams();
    const [candidate, setCandidate] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                const res = await api.get(`/v1/candidateprofiles/${id}`);
                setCandidate(res.data);
            } catch (error) {
                console.error('Lỗi tải thông tin ứng viên:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCandidate();
    }, [id]);

    // 🚀 HÀM XỬ LÝ FIX LỖI ĐƯỜNG DẪN 404 (NOT FOUND)
    const getFullCvUrl = (url: string) => {
        if (!url) return "";
        if (url.startsWith("http")) return url; // Nếu đã có http (link ngoài) thì giữ nguyên
        // Nối thêm địa chỉ Backend C# (nhớ đổi port 5012 nếu máy bạn chạy port khác)
        return `http://localhost:5012${url.startsWith('/') ? '' : '/'}${url}`;
    };

    if (loading) return <div className="p-10 text-center text-muted-foreground animate-pulse">Đang tải hồ sơ ứng viên...</div>;
    if (!candidate) return <div className="p-10 text-center text-red-500">Không tìm thấy thông tin ứng viên!</div>;

    // Lấy đường dẫn tuyệt đối cho CV
    const fullCvUrl = getFullCvUrl(candidate.cvUrl);

    return (
        <div className="space-y-6 pb-10">
            <div>
                <Link to="/employer/applicants" className="inline-flex items-center text-primary hover:underline font-medium mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách ứng viên
                </Link>
                <h1 className="text-2xl font-bold text-foreground">Chi tiết Hồ sơ Ứng viên</h1>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* CỘT TRÁI */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="bg-card border rounded-2xl p-6 shadow-sm">
                        <div className="flex flex-col items-center text-center border-b pb-6 mb-6">
                            <UserCircle2 className="w-24 h-24 text-slate-300 mb-4" />
                            <h2 className="text-2xl font-bold text-foreground">{candidate.fullName || 'Chưa cập nhật tên'}</h2>
                            <p className="text-primary font-medium mt-1">{candidate.experienceYears} năm kinh nghiệm</p>
                        </div>

                        <div className="space-y-4 text-sm text-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0"><Mail className="w-4 h-4 text-blue-600" /></div>
                                <span className="truncate">{candidate.user?.email || 'Chưa có email'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0"><Phone className="w-4 h-4 text-green-600" /></div>
                                <span>{candidate.phone || 'Chưa cập nhật SĐT'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4 text-orange-600" /></div>
                                <span>{candidate.address || 'Chưa cập nhật địa chỉ'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border rounded-2xl p-6 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Giới thiệu bản thân</h3>
                        <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">
                            {candidate.bio || 'Ứng viên chưa viết phần giới thiệu.'}
                        </p>
                    </div>
                </div>

                {/* CỘT PHẢI: KHUNG XEM CV NÂNG CẤP */}
                <div className="xl:col-span-2">
                    <div className="bg-card border rounded-2xl p-6 shadow-sm h-full flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> CV / Sơ yếu lý lịch</h3>
                            {fullCvUrl && (
                                <a href={fullCvUrl} target="_blank" rel="noreferrer">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Download className="w-4 h-4" /> Tải File gốc
                                    </Button>
                                </a>
                            )}
                        </div>

                        <div className="flex-1 bg-slate-100 rounded-xl border border-dashed flex items-center justify-center overflow-hidden h-[calc(100vh-200px)]">
                            {fullCvUrl ? (
                                <iframe
                                    src={`${fullCvUrl}#toolbar=0&navpanes=0`}
                                    className="w-full h-full border-0"
                                    title="CV Viewer"
                                />
                            ) : (
                                <div className="text-center text-muted-foreground flex flex-col items-center">
                                    <FileText className="w-12 h-12 mb-3 opacity-20" />
                                    <p>Ứng viên này chưa cập nhật Link CV.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}