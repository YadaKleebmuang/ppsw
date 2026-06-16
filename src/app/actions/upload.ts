'use server';

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) throw new Error('No file provided');

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) throw new Error('ImgBB API key is missing');

    const imgbbFormData = new FormData();
    imgbbFormData.append('image', file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: imgbbFormData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('ImgBB API error:', data);
      throw new Error(data.error?.message || 'Upload failed');
    }

    return { url: data.data.url, success: true };
  } catch (error: any) {
    console.error('Server upload error:', error);
    return { success: false, error: error.message };
  }
}
