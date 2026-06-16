import { getDocument, createDocument, updateDocument } from '@/lib/firebase/firestore';
import { ProfileFormValues } from '../schemas/profile.schema';

const COLLECTION_NAME = 'settings';
const DOC_ID = 'profile';

export const getProfile = async (): Promise<ProfileFormValues | null> => {
  return await getDocument(COLLECTION_NAME, DOC_ID);
};

export const saveProfile = async (data: ProfileFormValues) => {
  const existing = await getProfile();
  if (existing) {
    await updateDocument(COLLECTION_NAME, DOC_ID, data);
  } else {
    await createDocument(COLLECTION_NAME, DOC_ID, data);
  }
};
