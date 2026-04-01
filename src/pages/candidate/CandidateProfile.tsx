import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, FileText, Loader2, UserRound, GraduationCap, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import api from '@/lib/api';

const CandidateProfile = () => {
  const [profileId, setProfileId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, setValue, watch } = useForm();

  // Theo dõi giá trị cvUrl trong form để hiển thị UI
  const currentCvUrl = watch('cvUrl');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/v1/auth/me');
        if (res.data.candidateProfile) {
          setProfileId(res.data.candidateProfile.id);
          reset(res.data.candidateProfile);
        }
      } catch (e) {
        console.error("Lỗi tải thông tin", e);
      }
    };
    fetchProfile();
  }, [reset]);

  // HÀM XỬ LÝ UPLOAD FILE CV
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Kiểm tra dung lượng file (tối đa 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return toast({ variant: "destructive", title: "Lỗi", description: "Dung lượng file không được vượt quá 5MB." });
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      // Gọi API File Controller đã có sẵn ở Backend
      const res = await api.post('/v1/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const fileUrl = res.data.url || res.data.Url;
      setValue('cvUrl', fileUrl); // Lưu Link file vào biến cvUrl của Form ẩn bên dưới

      toast({ title: "Thành công", description: "Đã tải CV lên. Nhấn 'Lưu thay đổi' để hoàn tất!" });
    } catch (error) {
      toast({ variant: "destructive", title: "Lỗi", description: "Không thể upload file. Vui lòng thử lại sau." });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input để có thể chọn lại file cũ
    }
  };

  const onSubmit = async (data: any) => {
    // Ép kiểu số cho Số năm kinh nghiệm để C# không chê
    const payload = {
      ...data,
      experienceYears: data.experienceYears ? Number(data.experienceYears) : null
    };

    try {
      if (profileId) {
        await api.put(`/v1/candidateprofiles/${profileId}`, payload);
      } else {
        await api.post('/v1/candidateprofiles', payload);
      }
      toast({ title: "Thành công", description: "Cập nhật hồ sơ cá nhân thành công!" });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Lỗi", description: e.response?.data?.message || "Đã xảy ra lỗi cập nhật." });
    }
  };

  // Helper để lấy tên file gốc từ URL
  const getFileNameFromUrl = (url: string) => {
    if (!url) return "";
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hồ sơ cá nhân</h1>
        <p className="text-muted-foreground text-sm mt-1">Quản lý thông tin liên hệ và CV để thu hút nhà tuyển dụng</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* KHỐI THÔNG TIN CƠ BẢN */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2"><UserRound className="w-5 h-5 text-primary" /> Thông tin cơ bản</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Họ và tên <span className="text-red-500">*</span></Label>
                <Input required placeholder="VD: Nguyễn Văn A" {...register('fullName')} />
              </div>
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="09xx xxx xxx" {...register('phone')} />
                </div>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Địa chỉ hiện tại</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Ghi rõ Tỉnh/Thành phố hoặc địa chỉ cụ thể" {...register('address')} />
                </div>
              </div>
            </div>
          </div>

          {/* KHỐI CHUYÊN MÔN & CV */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2"><GraduationCap className="w-5 h-5 text-primary" /> Chuyên môn & CV đính kèm</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Số năm kinh nghiệm</Label>
                <Input type="number" min="0" placeholder="VD: 2" {...register('experienceYears')} />
              </div>

              {/* KHU VỰC UPLOAD CV MỚI */}
              <div className="space-y-2 sm:col-span-2 mt-2">
                <Label>CV Đính kèm (PDF, DOCX)</Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                  {/* Ô hiển thị file hiện tại */}
                  <div className={`flex-1 flex items-center gap-4 p-4 border rounded-xl w-full transition-colors ${currentCvUrl ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-dashed'}`}>
                    <div className={`p-3 rounded-lg ${currentCvUrl ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-semibold truncate text-foreground">
                        {currentCvUrl ? getFileNameFromUrl(currentCvUrl) : "Chưa có CV nào được tải lên"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {currentCvUrl ? <span className="flex items-center text-green-600"><CheckCircle2 className="w-3 h-3 mr-1" /> Sẵn sàng ứng tuyển</span> : "Dung lượng tối đa 5MB."}
                      </p>
                    </div>
                  </div>

                  {/* Nút Upload */}
                  <div className="shrink-0 w-full sm:w-auto">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                    <Button
                      type="button"
                      variant={currentCvUrl ? "outline" : "default"}
                      className="w-full h-12 px-6"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                      {currentCvUrl ? "Tải CV khác" : "Chọn file Upload"}
                    </Button>
                  </div>
                </div>
                {/* Field ẩn lưu giữ URL để Submit xuống Database */}
                <input type="hidden" {...register('cvUrl')} />
              </div>

              <div className="space-y-2 sm:col-span-2 pt-2">
                <Label>Giới thiệu bản thân (Bio)</Label>
                <Textarea
                  placeholder="Viết một vài dòng giới thiệu ngắn gọn về thế mạnh và định hướng nghề nghiệp của bạn..."
                  className="resize-none"
                  rows={4}
                  {...register('bio')}
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end">
            <Button type="submit" size="lg" className="px-8 text-base h-12">Lưu hồ sơ cá nhân</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CandidateProfile;