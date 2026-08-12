'use client';

import { useState, useEffect } from 'react';
import { TechStack } from '@/types';
import { techStackRepository } from '@/repositories/tech-stack.repository';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Cpu } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TechStackFormModal } from '@/features/tech-stacks/components/TechStackFormModal';
import { TechIcon } from '@/components/ui/tech-icon';
import { AdminPageHeader } from '@/components/layout/AdminPageHeader';
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
      toast.error('Could not load tech stacks.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    if (!confirm('Delete this technology?')) return;

    try {
      await techStackRepository.delete(id);
      toast.success('Technology deleted.');
      loadTechStacks();
    } catch (error) {
      console.error(error);
      toast.error('Could not delete technology.');
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={<Cpu className="size-4" />}
        eyebrow="Tools"
        title="Tech Stacks"
        description="Manage the technologies and icon names used across public skills and projects."
        action={
          <Button onClick={handleCreate} className="min-h-11 rounded-full bg-[#0063ff] px-5 font-bold text-white shadow-lg shadow-[#0063ff]/20 hover:bg-[#0051d6]">
            <Plus className="mr-2 size-4" />
            Add Tech Stack
          </Button>
        }
      />

      <div className="admin-card overflow-hidden rounded-[1.5rem] p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Icon Preview</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">Loading...</TableCell>
              </TableRow>
            ) : techStacks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">No technologies yet.</TableCell>
              </TableRow>
            ) : (
              techStacks.map((tech) => (
                <TableRow key={tech.id}>
                  <TableCell className="font-bold text-[#08245c]">{tech.name}</TableCell>
                  <TableCell>{tech.slug}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full bg-[#e8f2ff] text-[#0063ff]">
                        <TechIcon icon={tech.icon} name={tech.name} className="size-5" />
                      </span>
                      <span className="text-xs font-semibold text-[#6a82b2]">{tech.icon || '-'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={tech.isActive ? 'default' : 'secondary'} className={tech.isActive ? 'bg-emerald-600' : ''}>
                      {tech.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(tech)} className="text-[#0063ff]">
                      <Edit className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => tech.id && handleDelete(tech.id)} className="text-red-600">
                      <Trash2 className="size-4" />
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
