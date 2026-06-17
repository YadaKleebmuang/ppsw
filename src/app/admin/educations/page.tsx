'use client';

import { useState, useEffect } from 'react';
import { Education } from '@/types';
import { educationRepository } from '@/repositories/education.repository';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { EducationFormModal } from '@/features/educations/components/EducationFormModal';
import { toast } from 'sonner';

export default function EducationsPage() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | undefined>();

  const loadEducations = async () => {
    setIsLoading(true);
    try {
      const data = await educationRepository.getAllSorted();
      setEducations(data);
    } catch (error) {
      console.error(error);
      toast.error('ไม่สามารถโหลดข้อมูลประวัติการศึกษาได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEducations();
  }, []);

  const handleCreate = () => {
    setEditingEducation(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (education: Education) => {
    setEditingEducation(education);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบประวัติการศึกษานี้?')) return;
    
    try {
      await educationRepository.delete(id);
      toast.success('ลบประวัติการศึกษาสำเร็จ');
      loadEducations();
    } catch (error) {
      console.error(error);
      toast.error('ไม่สามารถลบประวัติการศึกษาได้');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Educations</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Years</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">กำลังโหลด...</TableCell>
              </TableRow>
            ) : educations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">ไม่พบข้อมูล</TableCell>
              </TableRow>
            ) : (
              educations.map((edu) => (
                <TableRow key={edu.id}>
                  <TableCell className="font-medium">{edu.order}</TableCell>
                  <TableCell>
                    <div className="font-medium">{edu.institution}</div>
                    <div className="text-sm text-gray-500">{edu.faculty} - {edu.major}</div>
                  </TableCell>
                  <TableCell>{edu.degree}</TableCell>
                  <TableCell>{edu.startYear} - {edu.endYear}</TableCell>
                  <TableCell>
                    <Badge variant={edu.isVisible ? 'default' : 'secondary'}>
                      {edu.isVisible ? 'Visible' : 'Hidden'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(edu)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => edu.id && handleDelete(edu.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EducationFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadEducations}
        initialData={editingEducation}
      />
    </div>
  );
}
