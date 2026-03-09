import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2 } from 'lucide-react';

const EmployerCompany = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: 'TechViet JSC',
      website: 'https://techviet.vn',
      industry: 'Công nghệ thông tin',
      size: '50-100',
      address: 'Cầu Giấy, Hà Nội',
      description: 'Công ty công nghệ chuyên phát triển giải pháp phần mềm cho doanh nghiệp.',
    },
  });

  const onSubmit = (data: any) => console.log('Company update:', data);

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Hồ sơ công ty</h1>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">TechViet JSC</p>
            <p className="text-sm text-muted-foreground">Công nghệ thông tin</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Tên công ty</Label>
              <Input {...register('name')} />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input {...register('website')} />
            </div>
            <div className="space-y-2">
              <Label>Ngành nghề</Label>
              <Input {...register('industry')} />
            </div>
            <div className="space-y-2">
              <Label>Quy mô</Label>
              <Input {...register('size')} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Địa chỉ</Label>
            <Input {...register('address')} />
          </div>
          <div className="space-y-2">
            <Label>Mô tả công ty</Label>
            <Textarea {...register('description')} rows={4} />
          </div>
          <Button type="submit">Lưu thay đổi</Button>
        </form>
      </div>
    </div>
  );
};

export default EmployerCompany;
