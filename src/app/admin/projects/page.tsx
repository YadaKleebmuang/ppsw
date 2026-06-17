'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { projectRepository } from '@/repositories/project.repository';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await projectRepository.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
      toast.error('ไม่สามารถโหลดข้อมูลโปรเจกต์ได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบโปรเจกต์นี้? ข้อมูลรูปภาพจะไม่ถูกลบออกจาก Cloudinary ทันที')) return;
    
    try {
      await projectRepository.delete(id);
      toast.success('ลบโปรเจกต์สำเร็จ');
      loadProjects();
    } catch (error) {
      console.error(error);
      toast.error('ไม่สามารถลบโปรเจกต์ได้');
    }
  };

  const togglePublish = async (project: Project) => {
    if (!project.id) return;
    try {
      await projectRepository.update(project.id, { isPublished: !project.isPublished });
      toast.success(project.isPublished ? 'ซ่อนโปรเจกต์แล้ว' : 'เผยแพร่โปรเจกต์แล้ว');
      loadProjects();
    } catch (error) {
      toast.error('อัปเดตสถานะไม่สำเร็จ');
    }
  };

  const toggleFeatured = async (project: Project) => {
    if (!project.id) return;
    try {
      await projectRepository.update(project.id, { isFeatured: !project.isFeatured });
      toast.success(project.isFeatured ? 'นำออกจากหน้าแรกแล้ว' : 'แสดงในหน้าแรกแล้ว');
      loadProjects();
    } catch (error) {
      toast.error('อัปเดตสถานะไม่สำเร็จ');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Link href="/admin/projects/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Cover</TableHead>
              <TableHead>Project Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">กำลังโหลด...</TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">ไม่พบข้อมูลโปรเจกต์</TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    {project.coverImageUrl ? (
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 border">
                        <img src={project.coverImageUrl} alt={project.titleEnglish} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-md bg-gray-100 border flex items-center justify-center text-xs text-gray-400">
                        No img
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">{project.titleEnglish}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[200px]">{project.titleThai}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.categoryId}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => togglePublish(project)}
                      className={project.isPublished ? 'text-green-600' : 'text-gray-400'}
                    >
                      {project.isPublished ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
                      {project.isPublished ? 'Published' : 'Draft'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleFeatured(project)}
                      className={project.isFeatured ? 'text-yellow-500' : 'text-gray-300'}
                    >
                      <Star className="w-5 h-5" fill={project.isFeatured ? 'currentColor' : 'none'} />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/projects/${project.id}`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => project.id && handleDelete(project.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
