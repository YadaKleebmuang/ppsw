'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/types';
import { categoryRepository } from '@/repositories/category.repository';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Tags } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CategoryFormModal } from '@/features/categories/components/CategoryFormModal';
import { AdminPageHeader } from '@/components/layout/AdminPageHeader';
import { toast } from 'sonner';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await categoryRepository.getAllSorted();
      setCategories(data);
    } catch (error) {
      console.error(error);
      toast.error('Could not load categories.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCategories();
  }, []);

  const handleCreate = () => {
    setEditingCategory(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return;

    try {
      await categoryRepository.delete(id);
      toast.success('Category deleted.');
      loadCategories();
    } catch (error) {
      console.error(error);
      toast.error('Could not delete category.');
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={<Tags className="size-4" />}
        eyebrow="Project Groups"
        title="Categories"
        description="Organize projects by type for filtering on the public site."
        action={
          <Button onClick={handleCreate} className="min-h-11 rounded-full bg-[#0063ff] px-5 font-bold text-white shadow-lg shadow-[#0063ff]/20 hover:bg-[#0051d6]">
            <Plus className="mr-2 size-4" />
            Add Category
          </Button>
        }
      />

      <div className="admin-card overflow-hidden rounded-[1.5rem] p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">Loading...</TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">No categories yet.</TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-bold text-[#08245c]">{category.order}</TableCell>
                  <TableCell className="font-bold text-[#08245c]">{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>
                    <Badge variant={category.isActive ? 'default' : 'secondary'} className={category.isActive ? 'bg-emerald-600' : ''}>
                      {category.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(category)} className="text-[#0063ff]">
                      <Edit className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => category.id && handleDelete(category.id)} className="text-red-600">
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadCategories}
        initialData={editingCategory}
      />
    </div>
  );
}
