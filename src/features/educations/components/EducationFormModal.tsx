import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { educationSchema, EducationFormData } from '../schemas/education.schema';
import { Education } from '@/types';
import { educationRepository } from '@/repositories/education.repository';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface EducationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Education;
}

export function EducationFormModal({ isOpen, onClose, onSuccess, initialData }: EducationFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      isVisible: true,
      order: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        institution: initialData.institution,
        degree: initialData.degree,
        faculty: initialData.faculty,
        major: initialData.major,
        startYear: initialData.startYear,
        endYear: initialData.endYear,
        description: initialData.description || '',
        order: initialData.order,
        isVisible: initialData.isVisible,
      });
    } else {
      reset({
        institution: '',
        degree: '',
        faculty: '',
        major: '',
        startYear: '',
        endYear: '',
        description: '',
        order: 0,
        isVisible: true,
      });
    }
  }, [initialData, reset, isOpen]);

  const onSubmit = async (data: EducationFormData) => {
    setIsLoading(true);
    try {
      if (initialData?.id) {
        await educationRepository.update(initialData.id, data);
        toast.success('อัปเดตประวัติการศึกษาสำเร็จ');
      } else {
        await educationRepository.create(data);
        toast.success('เพิ่มประวัติการศึกษาสำเร็จ');
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'แก้ไขประวัติการศึกษา' : 'เพิ่มประวัติการศึกษา'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto px-1">
          <div className="space-y-2">
            <Label htmlFor="institution">ชื่อสถาบันศึกษา</Label>
            <Input id="institution" {...register('institution')} placeholder="เช่น มหาวิทยาลัย..." />
            {errors.institution && <p className="text-sm text-red-500">{errors.institution.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="faculty">คณะ</Label>
              <Input id="faculty" {...register('faculty')} placeholder="เช่น วิศวกรรมศาสตร์" />
              {errors.faculty && <p className="text-sm text-red-500">{errors.faculty.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="major">สาขาวิชา</Label>
              <Input id="major" {...register('major')} placeholder="เช่น วิศวกรรมคอมพิวเตอร์" />
              {errors.major && <p className="text-sm text-red-500">{errors.major.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree">วุฒิการศึกษา</Label>
            <Input id="degree" {...register('degree')} placeholder="เช่น ปริญญาตรี" />
            {errors.degree && <p className="text-sm text-red-500">{errors.degree.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startYear">ปีที่เริ่มต้น</Label>
              <Input id="startYear" {...register('startYear')} placeholder="เช่น 2018 หรือ 2561" />
              {errors.startYear && <p className="text-sm text-red-500">{errors.startYear.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endYear">ปีที่จบ</Label>
              <Input id="endYear" {...register('endYear')} placeholder="เช่น 2022 หรือ ปัจจุบัน" />
              {errors.endYear && <p className="text-sm text-red-500">{errors.endYear.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">รายละเอียดเพิ่มเติม (ไม่บังคับ)</Label>
            <Input id="description" {...register('description')} placeholder="เช่น เกรดเฉลี่ย, กิจกรรมที่เข้าร่วม" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="order">ลำดับการแสดงผล</Label>
              <Input id="order" type="number" {...register('order', { valueAsNumber: true })} />
              {errors.order && <p className="text-sm text-red-500">{errors.order.message}</p>}
            </div>

            <div className="flex flex-col space-y-2 justify-center pt-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('isVisible')}
                  className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm font-medium">แสดงผล (Visible)</span>
              </label>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              ยกเลิก
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'กำลังบันทึก...' : 'บันทึก'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
