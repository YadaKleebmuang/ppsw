import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { skillSchema, SkillFormData } from '../schemas/skill.schema';
import { Skill } from '@/types';
import { skillRepository } from '@/repositories/skill.repository';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface SkillFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Skill;
}

export function SkillFormModal({ isOpen, onClose, onSuccess, initialData }: SkillFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      isVisible: true,
      order: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        category: initialData.category,
        level: String(initialData.level || ''),
        order: initialData.order,
        isVisible: initialData.isVisible,
      });
    } else {
      reset({
        name: '',
        category: '',
        level: '',
        order: 0,
        isVisible: true,
      });
    }
  }, [initialData, reset, isOpen]);

  const onSubmit = async (data: SkillFormData) => {
    setIsLoading(true);
    try {
      if (initialData?.id) {
        await skillRepository.update(initialData.id, data);
        toast.success('อัปเดตทักษะสำเร็จ');
      } else {
        await skillRepository.create(data);
        toast.success('เพิ่มทักษะสำเร็จ');
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'แก้ไขทักษะ' : 'เพิ่มทักษะ'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อทักษะ</Label>
            <Input id="name" {...register('name')} placeholder="เช่น React, Node.js" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">หมวดหมู่</Label>
            <Input id="category" {...register('category')} placeholder="เช่น Frontend, Backend, Tools" />
            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">ระดับ (ไม่บังคับ)</Label>
            <Input id="level" {...register('level')} placeholder="เช่น 90%, Advanced, หรือว่างไว้" />
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
