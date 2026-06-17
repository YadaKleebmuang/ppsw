'use client';

import { useState, useEffect } from 'react';
import { Experience } from '@/types';
import { experienceRepository } from '@/repositories/experience.repository';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ExperienceFormModal } from '@/features/experiences/components/ExperienceFormModal';
import { toast } from 'sonner';

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | undefined>();

  const loadExperiences = async () => {
    setIsLoading(true);
    try {
      const data = await experienceRepository.getAllSorted();
      setExperiences(data);
    } catch (error) {
      console.error(error);
      toast.error('ไม่สามารถโหลดข้อมูลประสบการณ์ทำงานได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleCreate = () => {
    setEditingExperience(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบประสบการณ์ทำงานนี้?')) return;
    
    try {
      await experienceRepository.delete(id);
      toast.success('ลบประสบการณ์ทำงานสำเร็จ');
      loadExperiences();
    } catch (error) {
      console.error(error);
      toast.error('ไม่สามารถลบประสบการณ์ทำงานได้');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Experiences</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">กำลังโหลด...</TableCell>
              </TableRow>
            ) : experiences.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">ไม่พบข้อมูล</TableCell>
              </TableRow>
            ) : (
              experiences.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell className="font-medium">{exp.order}</TableCell>
                  <TableCell>
                    <div className="font-medium">{exp.title}</div>
                    <div className="text-sm text-gray-500">{exp.organization}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{exp.type}</Badge>
                  </TableCell>
                  <TableCell>
                    {String(exp.startDate)} - {exp.endDate ? String(exp.endDate) : 'Present'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={exp.isVisible ? 'default' : 'secondary'}>
                      {exp.isVisible ? 'Visible' : 'Hidden'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(exp)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => exp.id && handleDelete(exp.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ExperienceFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadExperiences}
        initialData={editingExperience}
      />
    </div>
  );
}
