import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Briefcase } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth'; // Gọi hook Auth vào đây

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth(); // Lấy hàm login từ hook

  const onSubmit = async (data: any) => {
    // Thay vì console.log, chúng ta gọi thẳng xuống API
    await login(data);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary mx-auto mb-4">
            <Briefcase className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Đăng nhập</h1>
          <p className="text-muted-foreground mt-1">Chào mừng bạn quay trở lại</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register('email', { required: 'Vui lòng nhập email' })} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register('password', { required: 'Vui lòng nhập mật khẩu' })} />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message as string}</p>}
          </div>

          <Button type="submit" className="w-full">Đăng nhập</Button>

          <p className="text-sm text-center text-muted-foreground">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">Đăng ký</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;