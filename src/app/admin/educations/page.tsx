'use client';

import { useState, useEffect } from 'react';
import { Education } from '@/types';
import { educationRepository } from '@/repositories/education.repository';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, GraduationCap } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { EducationFormModal } from '@/features/educations/components/EducationFormModal';
import { AdminPageHeader } from '@/components/layout/AdminPageHeader';
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
      toast.error('Could not load education records.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    if (!confirm('Delete this education record?')) return;

    try {
      await educationRepository.delete(id);
      toast.success('Education record deleted.');
      loadEducations();
    } catch (error) {
      console.error(error);
      toast.error('Could not delete education record.');
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={<GraduationCap className="size-4" />}
        eyebrow="About Page"
        title="Education"
        description="Manage the education timeline shown on the public About page."
        action={
          <Button onClick={handleCreate} className="min-h-11 rounded-full bg-[#0063ff] px-5 font-bold text-white shadow-lg shadow-[#0063ff]/20 hover:bg-[#0051d6]">
            <Plus className="mr-2 size-4" />
            Add Education
          </Button>
        }
      />

      <div className="admin-card overflow-hidden rounded-[1.5rem] p-3">
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
                <TableCell colSpan={6} className="h-24 text-center">Loading...</TableCell>
              </TableRow>
            ) : educations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">No education records yet.</TableCell>
              </TableRow>
            ) : (
              educations.map((education) => (
                <TableRow key={education.id}>
                  <TableCell className="font-bold text-[#08245c]">{education.order}</TableCell>
                  <TableCell>
                    <div className="font-bold text-[#08245c]">{education.institution}</div>
                    <div className="text-sm text-[#6a82b2]">{education.faculty} - {education.major}</div>
                  </TableCell>
                  <TableCell>{education.degree}</TableCell>
                  <TableCell>{education.startYear} - {education.endYear}</TableCell>
                  <TableCell>
                    <Badge variant={education.isVisible ? 'default' : 'secondary'} className={education.isVisible ? 'bg-emerald-600' : ''}>
                      {education.isVisible ? 'Visible' : 'Hidden'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(education)} className="text-[#0063ff]">
                      <Edit className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => education.id && handleDelete(education.id)} className="text-red-600">
                      <Trash2 className="size-4" />
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
