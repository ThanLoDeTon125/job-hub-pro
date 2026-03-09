import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase } from 'lucide-react';
import { useState } from 'react';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [role, setRole] = useState('candidate');

  const onSubmit = (data: any) => {
    console.log('Register:', { ...data, role });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary mx-auto mb-4">
            <Briefcase className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Đăng ký</h1>
          <p className="text-muted-foreground mt-1">Tạo tài khoản mới</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="name">Họ và tên</Label>
            <Input id="name" placeholder="Nguyễn Văn A" {...register('name', { required: 'Vui lòng nhập tên' })} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register('email', { required: 'Vui lòng nhập email' })} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register('password', { required: 'Vui lòng nhập mật khẩu', minLength: { value: 6, message: 'Tối thiểu 6 ký tự' } })} />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label>Vai trò</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="candidate">Ứng viên</SelectItem>
                <SelectItem value="employer">Nhà tuyển dụng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">Đăng ký</Button>

          <p className="text-sm text-center text-muted-foreground">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">Đăng nhập</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
