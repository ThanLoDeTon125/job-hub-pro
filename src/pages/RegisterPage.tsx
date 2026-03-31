import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Briefcase } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const RegisterPage = () => {
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
  const { register: handleRegister } = useAuth();

  const onSubmit = async (data: any) => {
    // Ép cứng quyền CANDIDATE
    await handleRegister({
      email: data.email,
      password: data.password,
      fullName: data.name,
      role: 'CANDIDATE'
    });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4">
            <Briefcase className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Dành cho Ứng viên</h1>
          <p className="text-muted-foreground mt-1">Tạo hồ sơ và tìm kiếm cơ hội mới</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="name">Họ và tên</Label>
            <Input id="name" placeholder="Nguyễn Văn A" {...formRegister('name', { required: 'Vui lòng nhập tên' })} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...formRegister('email', { required: 'Vui lòng nhập email' })} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" type="password" placeholder="••••••••" {...formRegister('password', { required: 'Vui lòng nhập mật khẩu', minLength: { value: 6, message: 'Tối thiểu 6 ký tự' } })} />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message as string}</p>}
          </div>

          {/* ĐÃ XÓA KHỐI CHỌN ROLE Ở ĐÂY */}

          <Button type="submit" className="w-full">Đăng ký ứng viên</Button>

          <p className="text-sm text-center text-muted-foreground">
            Đã có tài khoản? <Link to="/login" className="text-primary font-medium hover:underline">Đăng nhập</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;