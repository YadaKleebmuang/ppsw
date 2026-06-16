import { 
  getDocuments, 
  getDocument, 
  createDocument, 
  updateDocument, 
  deleteDocument 
} from '@/lib/firebase/firestore';
import { ProjectFormValues } from '../schemas/project.schema';

const COLLECTION_NAME = 'projects';

export const getProjects = async () => {
  return await getDocuments(COLLECTION_NAME);
};

export const getProject = async (id: string) => {
  return await getDocument(COLLECTION_NAME, id);
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
