'use client';

import { useState, useEffect } from 'react';
import { Skill } from '@/types';
import { skillRepository } from '@/repositories/skill.repository';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { SkillFormModal } from '@/features/skills/components/SkillFormModal';
import { AdminPageHeader } from '@/components/layout/AdminPageHeader';
import { toast } from 'sonner';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | undefined>();

  const loadSkills = async () => {
    setIsLoading(true);
    try {
      const data = await skillRepository.getAllSorted();
      setSkills(data);
    } catch (error) {
      console.error(error);
      toast.error('Could not load skills.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSkills();
  }, []);

  const handleCreate = () => {
    setEditingSkill(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;

    try {
      await skillRepository.delete(id);
      toast.success('Skill deleted.');
      loadSkills();
    } catch (error) {
      console.error(error);
      toast.error('Could not delete skill.');
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={<Star className="size-4" />}
        eyebrow="Capabilities"
        title="Skills"
        description="Manage the skill cards shown on the public Skills page."
        action={
          <Button onClick={handleCreate} className="min-h-11 rounded-full bg-[#0063ff] px-5 font-bold text-white shadow-lg shadow-[#0063ff]/20 hover:bg-[#0051d6]">
            <Plus className="mr-2 size-4" />
            Add Skill
          </Button>
        }
      />

      <div className="admin-card overflow-hidden rounded-[1.5rem] p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">Loading...</TableCell>
              </TableRow>
            ) : skills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">No skills yet.</TableCell>
              </TableRow>
            ) : (
              skills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell className="font-bold text-[#08245c]">{skill.order}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{skill.category}</Badge>
                  </TableCell>
                  <TableCell className="font-bold text-[#08245c]">{skill.name}</TableCell>
                  <TableCell>{skill.level || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={skill.isVisible ? 'default' : 'secondary'} className={skill.isVisible ? 'bg-emerald-600' : ''}>
                      {skill.isVisible ? 'Visible' : 'Hidden'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(skill)} className="text-[#0063ff]">
                      <Edit className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => skill.id && handleDelete(skill.id)} className="text-red-600">
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <SkillFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadSkills}
        initialData={editingSkill}
      />
    </div>
  );
}
