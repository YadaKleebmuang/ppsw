import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { experienceSchema, ExperienceFormData } from '../schemas/experience.schema';
import { Experience } from '@/types';
import { experienceRepository } from '@/repositories/experience.repository';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ExperienceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Experience;
}

export function ExperienceFormModal({ isOpen, onClose, onSuccess, initialData }: ExperienceFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentJob, setIsCurrentJob] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      isVisible: true,
      order: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      const isCurrent = !initialData.endDate;
      setIsCurrentJob(isCurrent);
      reset({
        title: initialData.title,
        organization: initialData.organization,
        type: initialData.type,
        startDate: String(initialData.startDate),
        endDate: isCurrent ? null : String(initialData.endDate),
        description: initialData.description || '',
        order: initialData.order,
        isVisible: initialData.isVisible,
      });
    } else {
      setIsCurrentJob(false);
      reset({
        title: '',
        organization: '',
        type: '',
        startDate: '',
        endDate: '',
        description: '',
        order: 0,
        isVisible: true,
      });
    }
  }, [initialData, reset, isOpen]);

  const handleCurrentJobChange = (checked: boolean) => {
    setIsCurrentJob(checked);
    if (checked) {
      setValue('endDate', null);
    } else {
      setValue('endDate', '');
    }
  };

  const onSubmit = async (data: ExperienceFormData) => {
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        endDate: data.endDate ?? null,
      };
      if (initialData?.id) {
        await experienceRepository.update(initialData.id, payload);
        toast.success('อัปเดตประสบการณ์ทำงานสำเร็จ');
      } else {
        await experienceRepository.create(payload);
        toast.success('เพิ่มประสบการณ์ทำงานสำเร็จ');
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
          <DialogTitle>{initialData ? 'แก้ไขประสบการณ์ทำงาน' : 'เพิ่มประสบการณ์ทำงาน'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto px-1">
          <div className="space-y-2">
            <Label htmlFor="title">ตำแหน่งงาน (Role)</Label>
            <Input id="title" {...register('title')} placeholder="เช่น Frontend Developer" />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organization">องค์กร/บริษัท</Label>
              <Input id="organization" {...register('organization')} placeholder="เช่น Google Thailand" />
              {errors.organization && <p className="text-sm text-red-500">{errors.organization.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">ประเภทงาน</Label>
              <Input id="type" {...register('type')} placeholder="เช่น Full-time, Internship" />
              {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">วันที่เริ่มงาน</Label>
              <Input id="startDate" {...register('startDate')} placeholder="เช่น ม.ค. 2021 หรือ 01/2021" />
              {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">วันที่สิ้นสุด</Label>
              <Input 
                id="endDate" 
                {...register('endDate')} 
                placeholder="เช่น ธ.ค. 2022" 
                disabled={isCurrentJob}
                className={isCurrentJob ? "bg-gray-100" : ""}
                value={isCurrentJob ? "" : watch('endDate') || ""}
              />
              {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
              <label className="flex items-center space-x-2 mt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCurrentJob}
                  onChange={(e) => handleCurrentJobChange(e.target.checked)}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-xs text-gray-500">ปัจจุบันยังทำงานอยู่ที่นี่</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">รายละเอียดงาน (Responsibilities)</Label>
            <Textarea 
              id="description" 
              {...register('description')} 
              placeholder="อธิบายหน้าที่ความรับผิดชอบและผลงานที่โดดเด่น..." 
              className="min-h-[100px]"
            />
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
