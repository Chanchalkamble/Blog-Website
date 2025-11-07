import { Button, Spinner } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
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
  const [errorMessage, setErrorMessage] = useState(null);

  const handleGoogleClick = async () => {
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      // 1️⃣ Firebase Google Sign-In
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      // 2️⃣ Send user info to backend
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${backendUrl}/api/auth/google`, {
        method: 'POST',
        credentials: 'include', // include cookies
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setErrorMessage(data.message || 'Google Sign-In failed');
        setLoading(false);
        return;
      }

      // 3️⃣ Redux update & redirect
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setErrorMessage(error.message || 'Google Sign-In failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="mb-3 text-red-600 text-sm">{errorMessage}</div>
      )}
      <Button
        type="button"
        gradientDuoTone="pinkToOrange"
        outline
        onClick={handleGoogleClick}
        disabled={loading}
        className="flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Spinner size="sm" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <AiFillGoogleCircle className="w-6 h-6" />
            Continue with Google
          </>
        )}
      </Button>
    </>
  );
}
