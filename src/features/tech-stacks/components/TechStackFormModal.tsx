import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { techStackSchema, TechStackFormData } from '../schemas/tech-stack.schema';
import { TechStack } from '@/types';
import { techStackRepository } from '@/repositories/tech-stack.repository';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface TechStackFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: TechStack;
}

export function TechStackFormModal({ isOpen, onClose, onSuccess, initialData }: TechStackFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TechStackFormData>({
    resolver: zodResolver(techStackSchema),
    defaultValues: {
      isActive: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        slug: initialData.slug,
        icon: initialData.icon,
        isActive: initialData.isActive,
      });
    } else {
      reset({
        name: '',
        slug: '',
        icon: '',
        isActive: true,
      });
    }
  }, [initialData, reset, isOpen]);

  const onSubmit = async (data: TechStackFormData) => {
    setIsLoading(true);
    try {
      if (initialData?.id) {
        await techStackRepository.update(initialData.id, data);
        toast.success('อัปเดตเทคโนโลยีสำเร็จ');
      } else {
        await techStackRepository.create(data);
        toast.success('เพิ่มเทคโนโลยีสำเร็จ');
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
          <DialogTitle>{initialData ? 'แก้ไขเทคโนโลยี' : 'เพิ่มเทคโนโลยี'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อเทคโนโลยี</Label>
            <Input id="name" {...register('name')} placeholder="เช่น React" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input id="slug" {...register('slug')} placeholder="เช่น react" />
            {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">ชื่อไอคอน (React Icons) หรือ URL</Label>
            <Input id="icon" {...register('icon')} placeholder="เช่น FaReact หรือ https://..." />
            {errors.icon && <p className="text-sm text-red-500">{errors.icon.message}</p>}
          </div>

          <div className="flex flex-col space-y-2 justify-center pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('isActive')}
                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm font-medium">เปิดใช้งาน (Active)</span>
            </label>
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
