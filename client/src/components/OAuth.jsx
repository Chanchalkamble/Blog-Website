import { Button, Spinner } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getAuth } from 'firebase/auth';
import app from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleClick = async () => {
    if (loading) return; // prevent multiple clicks
    setLoading(true);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      // 👇 Must be triggered directly by the click
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        console.error('Server returned error:', data.message);
      }

    } catch (error) {
      console.error('Google Sign-In Error:', error);

      // 👇 Handle popup-blocked by falling back to redirect sign-in
      if (error.code === 'auth/popup-blocked') {
        console.warn('Popup blocked — switching to redirect mode...');
        await signInWithRedirect(auth, provider);
      } else if (error.code === 'auth/cancelled-popup-request') {
        // user closed popup — ignore silently
      } else {
        alert('Google Sign-In failed. Please allow popups for this site.');
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
      disabled={loading}
    >
      {loading ? (
        <>
          <Spinner size="sm" />
          <span className="pl-2">Signing in...</span>
        </>
      ) : (
        <>
          <AiFillGoogleCircle className="w-6 h-6 mr-2" />
          Continue with Google
        </>
      )}
    </Button>
  );
}
