import { getDocument, createDocument, updateDocument } from '@/lib/firebase/firestore';
import { SettingsFormValues } from '../schemas/settings.schema';

const COLLECTION_NAME = 'settings';
const DOC_ID = 'general';

export const getSettings = async (): Promise<SettingsFormValues | null> => {
  return await getDocument(COLLECTION_NAME, DOC_ID);
};

export const saveSettings = async (data: SettingsFormValues) => {
  const existing = await getSettings();
  if (existing) {
    await updateDocument(COLLECTION_NAME, DOC_ID, data);
  } else {
    await createDocument(COLLECTION_NAME, DOC_ID, data);
  }
};
