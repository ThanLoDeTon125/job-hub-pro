import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import api from '@/lib/api';

const CandidateProfile = () => {
  const [profileId, setProfileId] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm();

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

  const onSubmit = async (data: any) => {
    try {
      if (profileId) {
        await api.put(`/v1/candidateprofiles/${profileId}`, data);
      } else {
        await api.post('/v1/candidateprofiles', data);
      }
      toast({ title: "Thành công", description: "Cập nhật hồ sơ thành công!" });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Lỗi", description: e.response?.data?.message || "Lỗi cập nhật." });
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Hồ sơ cá nhân</h1>
      <div className="rounded-xl border bg-card p-6 shadow-card">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Họ và tên</Label><Input {...register('fullName')} /></div>
            <div className="space-y-2"><Label>Số điện thoại</Label><Input {...register('phone')} /></div>
            <div className="space-y-2"><Label>Địa chỉ</Label><Input {...register('address')} /></div>
            <div className="space-y-2"><Label>Kinh nghiệm (năm)</Label><Input type="number" {...register('experienceYears')} /></div>
          </div>
          <div className="space-y-2"><Label>Link CV (URL)</Label><Input {...register('cvUrl')} /></div>
          <div className="space-y-2"><Label>Giới thiệu bản thân (Bio)</Label><Textarea {...register('bio')} rows={4} /></div>
          <Button type="submit">Lưu thay đổi</Button>
        </form>
      </div>
    </div>
  );
};
export default CandidateProfile;