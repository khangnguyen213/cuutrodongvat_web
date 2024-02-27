import { storage } from '@/firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

export const imagesToFirebaseUrls = async (images, name) => {
  const urls = [];
  let i = 1;
  for (const image of images) {
    const storageRef = ref(
      storage,
      `cuu_tro/lalasia_db_product_${name || 0}_${image.name}_${i++}`
    );
    const uploadTask = uploadBytes(storageRef, image);
    await uploadTask;
    const url = await getDownloadURL(storageRef);
    urls.push(url);
  }
  return urls;
};
