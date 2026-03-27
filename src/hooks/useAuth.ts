import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { toast } from '@/hooks/use-toast';

export interface User {
  id: number;
  email: string;
  role: 'CANDIDATE' | 'EMPLOYER' | 'ADMIN';
  status: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Endpoint 'me' mà ta vừa viết ở backend
          const response = await api.get('/v1/auth/me');
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (data: any) => {
    try {
      const response = await api.post('/v1/auth/login', data);
      const { token, role, email, userId } = response.data;
      
      localStorage.setItem('token', token);
      setUser({ id: userId, email, role, status: 'ACTIVE' });
      
      toast({
        title: "Đăng nhập thành công!",
        description: `Chào mừng ${email} quay trở lại.`,
      });

      // Chuyển hướng theo Role
      if (role === 'ADMIN') navigate('/admin');
      else if (role === 'EMPLOYER') navigate('/employer');
      else navigate('/candidate');
      
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Đăng nhập thất bại",
        description: error.response?.data?.message || "Email hoặc mật khẩu không chính xác.",
      });
      return false;
    }
  };

  const register = async (data: any) => {
    try {
      // Backend api/v1/auth/register (mặc dù user chưa sửa Register ở backend, 
      // nhưng ta giả định nó sẽ được đưa lên cùng với login)
      const response = await api.post('/v1/auth/register', data);
      const { token, role, email, userId } = response.data;
      
      localStorage.setItem('token', token);
      setUser({ id: userId, email, role, status: 'ACTIVE' });

      toast({
        title: "Đăng ký thành công!",
        description: "Chào mừng bạn gia nhập JobHubPro.",
      });

      if (role === 'EMPLOYER') navigate('/employer');
      else navigate('/candidate');

      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Đăng ký thất bại",
        description: error.response?.data?.message || "Đã có lỗi xảy ra khi đăng ký.",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post('/v1/auth/logout');
    } catch (e) {
      // Bỏ qua lỗi logout ở backend vì client vẫn sẽ xóa token
    }
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
    toast({
      title: "Đã đăng xuất",
      description: "Hẹn gặp lại bạn sớm!",
    });
  };

  return { user, loading, login, register, logout };
};
