import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function EmployerLoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();

    const onSubmit = async (data: any) => {
        await login(data);
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center py-12 bg-slate-50">
            <div className="w-full max-w-md mx-auto px-4">
                <div className="text-center mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white mx-auto mb-4 shadow-lg">
                        <Building2 className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Nhà tuyển dụng</h1>
                    <p className="text-slate-500 mt-2">Đăng nhập để quản lý tin tuyển dụng và CV</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border bg-white p-8 shadow-xl">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email công ty</Label>
                        <Input id="email" type="email" placeholder="hr@company.com" {...register('email', { required: 'Vui lòng nhập email' })} />
                        {errors.email && <p className="text-xs text-red-500">{errors.email.message as string}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Input id="password" type="password" placeholder="••••••••" {...register('password', { required: 'Vui lòng nhập mật khẩu' })} />
                        {errors.password && <p className="text-xs text-red-500">{errors.password.message as string}</p>}
                    </div>

                    <Button type="submit" className="w-full bg-black hover:bg-slate-800 text-white h-11 text-base">Đăng nhập cổng Doanh nghiệp</Button>

                    <p className="text-sm text-center text-slate-500 pt-4">
                        Doanh nghiệp mới? <Link to="/employer/register" className="text-blue-600 font-semibold hover:underline">Đăng ký ngay</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}