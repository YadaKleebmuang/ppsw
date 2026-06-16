import { storage } from './client';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export const uploadFile = async (
  file: File, 
  path: string, 
  onProgress?: (progress: number) => void
): Promise<{ url: string, path: string }> => {
  try {
    const storageRef = ref(storage, path);
    // Since images are compressed and small, we use standard uploadBytes which is much more reliable and avoids timeout/CORS loops
    const snapshot = await uploadBytes(storageRef, file);
    if (onProgress) {
      onProgress(100);
    }
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { url: downloadURL, path };
  } catch (error) {
    console.error('Error in uploadFile:', error);
    throw error;
  }
};

export const deleteFile = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};
