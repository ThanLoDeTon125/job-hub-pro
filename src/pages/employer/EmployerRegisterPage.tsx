import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function EmployerRegisterPage() {
    const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
    const { register: handleRegister } = useAuth();

    const onSubmit = async (data: any) => {
        // Ép cứng quyền EMPLOYER
        await handleRegister({
            email: data.email,
            password: data.password,
            fullName: data.name, // Tên người đại diện HR
            role: 'EMPLOYER'
        });
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center py-12 bg-slate-50">
            <div className="w-full max-w-md mx-auto px-4">
                <div className="text-center mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white mx-auto mb-4 shadow-lg">
                        <Building2 className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Đăng ký Doanh nghiệp</h1>
                    <p className="text-slate-500 mt-2">Tiếp cận hàng triệu ứng viên tài năng</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border bg-white p-8 shadow-xl">
                    <div className="space-y-2">
                        <Label htmlFor="name">Tên người đại diện (HR)</Label>
                        <Input id="name" placeholder="Nguyễn Văn HR" {...formRegister('name', { required: 'Vui lòng nhập tên' })} />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message as string}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email công ty</Label>
                        <Input id="email" type="email" placeholder="hr@company.com" {...formRegister('email', { required: 'Vui lòng nhập email' })} />
                        {errors.email && <p className="text-xs text-red-500">{errors.email.message as string}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Input id="password" type="password" placeholder="••••••••" {...formRegister('password', { required: 'Vui lòng nhập mật khẩu', minLength: { value: 6, message: 'Tối thiểu 6 ký tự' } })} />
                        {errors.password && <p className="text-xs text-red-500">{errors.password.message as string}</p>}
                    </div>

                    <Button type="submit" className="w-full bg-black hover:bg-slate-800 text-white h-11 text-base mt-2">Tạo tài khoản Doanh nghiệp</Button>

                    <p className="text-sm text-center text-slate-500 pt-4">
                        Đã có tài khoản? <Link to="/employer/login" className="text-blue-600 font-semibold hover:underline">Đăng nhập</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}