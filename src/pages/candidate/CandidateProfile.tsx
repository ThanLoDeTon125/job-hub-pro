import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import api from '@/lib/api';

const CandidateProfile = () => {
  const [profileId, setProfileId] = useState<number | null>(null);
  const [skills, setSkills] = useState<string[]>([]); // Mảng lưu các tag kỹ năng
  const [skillInput, setSkillInput] = useState('');

  const { register, handleSubmit, reset } = useForm();

  // Hàm thêm kỹ năng vào mảng tạm
  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  // Hàm xóa kỹ năng
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const onSubmit = async (data: any) => {
    try {
      // 1. Lưu Profile
      let candidateId = profileId;
      if (profileId) {
        await api.put(`/v1/candidateprofiles/${profileId}`, data);
      } else {
        const res = await api.post('/v1/candidateprofiles', data);
        candidateId = res.data.id;
      }

      // 2. Lưu danh sách Kỹ năng (Gọi API CandidateSkillsController)
      // *Lưu ý: Đoạn này phụ thuộc vào API CandidateSkillsController của bạn có hàm POST nhận danh sách không.
      // Dưới đây là logic giả lập nếu bạn có API nhận array skills.
      if (candidateId && skills.length > 0) {
        // await api.post(`/v1/candidateskills/bulk`, { candidateId, skills });
      }

      toast({ title: "Thành công", description: "Cập nhật hồ sơ và kỹ năng thành công!" });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Lỗi", description: "Lỗi cập nhật." });
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* ... Form thông tin cá nhân cũ ở đây ... */}

      <div className="rounded-xl border bg-card p-6 shadow-card mt-6">
        <h2 className="text-lg font-bold mb-4">Kỹ năng chuyên môn</h2>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Nhập kỹ năng (VD: React, SQL...)"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          />
          <Button type="button" onClick={addSkill}>Thêm</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
              {skill}
              <button type="button" className="ml-2 text-red-500 font-bold" onClick={() => removeSkill(skill)}>x</button>
            </span>
          ))}
        </div>
      </div>

      <Button onClick={handleSubmit(onSubmit)} className="mt-4 w-full">Lưu toàn bộ thay đổi</Button>
    </div>
  );
};
export default CandidateProfile;