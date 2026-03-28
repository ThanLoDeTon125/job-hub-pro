import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import api from '@/lib/api';

const EmployerCompany = () => {
  const [companyId, setCompanyId] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchMyCompany = async () => {
      try {
        const res = await api.get('/v1/auth/me');
        if (res.data.company) {
          setCompanyId(res.data.company.id);
          reset(res.data.company); // Điền data thật vào form
        }
      } catch (e) {
        console.error("Lỗi tải thông tin", e);
      }
    };
    fetchMyCompany();
  }, [reset]);

  const onSubmit = async (data: any) => {
    try {
      if (companyId) {
        await api.put(`/v1/companies/${companyId}`, data);
      } else {
        await api.post('/v1/companies', data);
      }
      toast({ title: "Thành công", description: "Lưu hồ sơ công ty thành công!" });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Lỗi", description: e.response?.data?.message || "Lỗi cập nhật." });
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Hồ sơ công ty</h1>
      <div className="rounded-xl border bg-card p-6 shadow-card">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Tên công ty</Label><Input {...register('companyName')} /></div>
            <div className="space-y-2"><Label>Mã số thuế</Label><Input {...register('taxCode')} /></div>
            <div className="space-y-2"><Label>Website</Label><Input {...register('website')} /></div>
            <div className="space-y-2"><Label>Quy mô</Label><Input {...register('companySize')} /></div>
          </div>
          <div className="space-y-2"><Label>Địa chỉ</Label><Input {...register('address')} /></div>
          <div className="space-y-2"><Label>Mô tả công ty</Label><Textarea {...register('description')} rows={4} /></div>
          <Button type="submit">Lưu thay đổi</Button>
        </form>
      </div>
    </div>
  );
};
export default EmployerCompany;