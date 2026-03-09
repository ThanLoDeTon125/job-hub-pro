import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';

const CandidateProfile = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: 'Nguyễn Văn A',
      email: 'a@email.com',
      phone: '0901234567',
      address: 'Hà Nội',
      title: 'Frontend Developer',
      bio: 'Tôi là một lập trình viên frontend với 3 năm kinh nghiệm, chuyên về React và TypeScript.',
    },
  });

  const onSubmit = (data: any) => console.log('Profile update:', data);

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Hồ sơ cá nhân</h1>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Nguyễn Văn A</p>
            <p className="text-sm text-muted-foreground">Frontend Developer</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Họ và tên</Label>
              <Input {...register('name')} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input {...register('email')} type="email" />
            </div>
            <div className="space-y-2">
              <Label>Số điện thoại</Label>
              <Input {...register('phone')} />
            </div>
            <div className="space-y-2">
              <Label>Địa chỉ</Label>
              <Input {...register('address')} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Vị trí mong muốn</Label>
            <Input {...register('title')} />
          </div>
          <div className="space-y-2">
            <Label>Giới thiệu bản thân</Label>
            <Textarea {...register('bio')} rows={4} />
          </div>
          <Button type="submit">Lưu thay đổi</Button>
        </form>
      </div>
    </div>
  );
};

export default CandidateProfile;
