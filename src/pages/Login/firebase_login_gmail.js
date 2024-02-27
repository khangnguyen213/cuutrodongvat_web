import { app } from '@/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { store } from '@/redux/store';
import { addFoster, login } from '@/services/fosters/fostersService';

export const firebase_login_gmail = async () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user);
    const fosters = store.getState().fosters;
    const foster = fosters.find((foster) => foster.email === user.email);
    if (!foster) {
      await addFoster({
        email: user.email,
        password: user.uid,
        name: user.displayName,
        phone: user.phoneNumber,
        facebook: prompt('Bổ sung link facebook của bạn nếu có nhé') || '',
        avatar: user.photoURL,
      });
      login(user.email, user.uid);
    } else {
      login(user.email, user.uid);
    }
  } catch (error) {
    console.log(error);
  }
};
