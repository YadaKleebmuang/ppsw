import { 
  getDocuments, 
  getDocument, 
  createDocument, 
  updateDocument, 
  deleteDocument 
} from '@/lib/firebase/firestore';
import { where } from 'firebase/firestore';
import { ProjectFormValues } from '../schemas/project.schema';

const COLLECTION_NAME = 'projects';

export const getProjects = async () => {
  return await getDocuments(COLLECTION_NAME);
};

export const getPublishedProjects = async () => {
  return await getDocuments(COLLECTION_NAME, [where('isPublished', '==', true)]);
};

export const getProject = async (id: string) => {
  return await getDocument(COLLECTION_NAME, id);
};

export const getProjectBySlug = async (slug: string) => {
  const docs = await getDocuments(COLLECTION_NAME, [where('slug', '==', slug)]);
  return docs.length > 0 ? docs[0] : null;
};

export const createProject = async (data: ProjectFormValues) => {
  const id = data.slug;
  await createDocument(COLLECTION_NAME, id, data);
  return id;
};

export const updateProject = async (id: string, data: Partial<ProjectFormValues>) => {
  await updateDocument(COLLECTION_NAME, id, data);
};

export const deleteProjectData = async (id: string) => {
  await deleteDocument(COLLECTION_NAME, id);
};
