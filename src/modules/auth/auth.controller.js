import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';

const handleSignIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).json({
      message: 'Missing email or password',
    });
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return res.status(200).json({
      data: userCredential.user,
      message: 'Login successful',
    });
  } catch (error) {
    let errorMessage = 'Login failed';
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid email or password';
    }
    return res.status(401).json({
      data: {},
      message: errorMessage,
    });
  }
};

const handleSignUp = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Missing email or password',
    });
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return res.status(200).json({
      data: userCredential.user,
      message: 'Signup successful',
    });
  } catch (error) {
    return res.status(401).json({
      data: {},
      message: error,
    });
  }
};

export default { handleSignIn, handleSignUp };
