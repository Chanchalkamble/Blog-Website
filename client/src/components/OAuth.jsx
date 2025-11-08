import { Button, Spinner } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getAuth,
  getRedirectResult,
} from 'firebase/auth';
import app from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Handle redirect results (for users who came back after redirect sign-in)
  useEffect(() => {
    const handleRedirectSignIn = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              googlePhotoUrl: result.user.photoURL,
            }),
          });

          const data = await res.json();
          if (res.ok) {
            dispatch(signInSuccess(data));
            navigate('/');
          } else {
            console.error('Server error after redirect:', data.message);
          }
        }
      } catch (err) {
        console.error('Redirect Sign-In Error:', err);
      }
    };

    handleRedirectSignIn();
  }, [auth, dispatch, navigate]);

  // ✅ Handle Google popup or fallback to redirect
  const handleGoogleClick = async () => {
    if (loading) return;
    setLoading(true);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      // Try popup login first
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

      // 👇 If popup is blocked (common on mobile or in some browsers)
      if (error.code === 'auth/popup-blocked') {
        console.warn('Popup blocked — using redirect sign-in instead.');
        await signInWithRedirect(auth, provider);
      } else if (error.code === 'auth/cancelled-popup-request') {
        // User closed popup; no action needed
      } else {
        alert('Google Sign-In failed. Please enable popups for this site.');
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
