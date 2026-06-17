'use client';

import { useState, useEffect } from 'react';
import { TechStack } from '@/types';
import { techStackRepository } from '@/repositories/tech-stack.repository';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TechStackFormModal } from '@/features/tech-stacks/components/TechStackFormModal';
import { toast } from 'sonner';

export default function TechStacksPage() {
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTechStack, setEditingTechStack] = useState<TechStack | undefined>();

  const loadTechStacks = async () => {
    setIsLoading(true);
    try {
      const data = await techStackRepository.getAllSorted();
      setTechStacks(data);
    } catch (error) {
      console.error(error);
      toast.error('ไม่สามารถโหลดข้อมูลเทคโนโลยีได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTechStacks();
  }, []);

  const handleCreate = () => {
    setEditingTechStack(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (techStack: TechStack) => {
    setEditingTechStack(techStack);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบเทคโนโลยีนี้?')) return;
    
    try {
      await techStackRepository.delete(id);
      toast.success('ลบเทคโนโลยีสำเร็จ');
      loadTechStacks();
    } catch (error) {
      console.error(error);
      toast.error('ไม่สามารถลบเทคโนโลยีได้');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tech Stacks</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Tech Stack
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">กำลังโหลด...</TableCell>
              </TableRow>
            ) : techStacks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">ไม่พบข้อมูล</TableCell>
              </TableRow>
            ) : (
              techStacks.map((ts) => (
                <TableRow key={ts.id}>
                  <TableCell className="font-medium">{ts.name}</TableCell>
                  <TableCell>{ts.slug}</TableCell>
                  <TableCell>
                    {/* Placeholder for icon rendering if it's an image or react-icon string */}
                    <span className="text-sm text-neutral-500">{ts.icon}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={ts.isActive ? 'default' : 'secondary'}>
                      {ts.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(ts)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => ts.id && handleDelete(ts.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TechStackFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadTechStacks}
        initialData={editingTechStack}
      />
    </div>
  );
}
