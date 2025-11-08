import { Button, Spinner } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithRedirect, getAuth, getRedirectResult } from 'firebase/auth';
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

  // ✅ Handle redirect result after coming back from Google
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
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
          }
        }
      })
      .catch((err) => console.error('Redirect Sign-In Error:', err));
  }, [auth, dispatch, navigate]);

  const handleGoogleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      // 👇 Redirect instead of popup
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Google Redirect Sign-In Error:', error);
      alert('Google Sign-In failed. Try again.');
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
          <span className="pl-2">Redirecting...</span>
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
