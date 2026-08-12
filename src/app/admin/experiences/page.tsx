'use client';

import { useState, useEffect } from 'react';
import { Experience } from '@/types';
import { experienceRepository } from '@/repositories/experience.repository';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Briefcase } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ExperienceFormModal } from '@/features/experiences/components/ExperienceFormModal';
import { AdminPageHeader } from '@/components/layout/AdminPageHeader';
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
      toast.error('Could not load experiences.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    if (!confirm('Delete this experience?')) return;

    try {
      await experienceRepository.delete(id);
      toast.success('Experience deleted.');
      loadExperiences();
    } catch (error) {
      console.error(error);
      toast.error('Could not delete experience.');
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={<Briefcase className="size-4" />}
        eyebrow="Timeline"
        title="Experiences"
        description="Manage experience records for the public portfolio."
        action={
          <Button onClick={handleCreate} className="min-h-11 rounded-full bg-[#0063ff] px-5 font-bold text-white shadow-lg shadow-[#0063ff]/20 hover:bg-[#0051d6]">
            <Plus className="mr-2 size-4" />
            Add Experience
          </Button>
        }
      />

      <div className="admin-card overflow-hidden rounded-[1.5rem] p-3">
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
                <TableCell colSpan={6} className="h-24 text-center">Loading...</TableCell>
              </TableRow>
            ) : experiences.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">No experiences yet.</TableCell>
              </TableRow>
            ) : (
              experiences.map((experience) => (
                <TableRow key={experience.id}>
                  <TableCell className="font-bold text-[#08245c]">{experience.order}</TableCell>
                  <TableCell>
                    <div className="font-bold text-[#08245c]">{experience.title}</div>
                    <div className="text-sm text-[#6a82b2]">{experience.organization}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{experience.type}</Badge>
                  </TableCell>
                  <TableCell>
                    {String(experience.startDate)} - {experience.endDate ? String(experience.endDate) : 'Present'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={experience.isVisible ? 'default' : 'secondary'} className={experience.isVisible ? 'bg-emerald-600' : ''}>
                      {experience.isVisible ? 'Visible' : 'Hidden'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(experience)} className="text-[#0063ff]">
                      <Edit className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => experience.id && handleDelete(experience.id)} className="text-red-600">
                      <Trash2 className="size-4" />
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
