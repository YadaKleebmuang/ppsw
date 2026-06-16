import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { getProjects, deleteProjectData } from '@/features/projects/services/project.service';
import { ProjectFormValues } from '@/features/projects/schemas/project.schema';

export const metadata = {
  title: 'Manage Projects | Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminProjects() {
  const projects = await getProjects() as (ProjectFormValues & { id: string })[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-gray-500">จัดการผลงานของคุณทั้งหมด</p>
        </div>
        <Button className="bg-black hover:bg-gray-800" render={<Link href="/admin/projects/new" />} nativeButton={false}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No projects found. Click "Add Project" to create one.
                </TableCell>
              </TableRow>
            ) : projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.titleTh}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell>
                  {project.isPublished ? (
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      Draft
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" render={<Link href={`/projects/${project.slug}`} target="_blank" />} nativeButton={false}>
                      <ExternalLink className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" render={<Link href={`/admin/projects/${project.id}`} />} nativeButton={false}>
                      <Edit className="h-4 w-4 text-orange-500" />
                    </Button>
                    <form action={async () => {
                      'use server';
                      await deleteProjectData(project.id);
                      revalidatePath('/admin/projects');
                    }}>
                      <Button type="submit" variant="ghost" size="icon" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
