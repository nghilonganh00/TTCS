import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../firebase/firebase-config';
import UserDAO from './user.DAO';

const firestoreDB = getFirestore(app);

const handleGetUserById = async (userId) => {
  try {
    const docRef = doc(firestoreDB, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    return '';
  } catch (error) {
    throw Error;
  }
};

const handleGetNameByUserId = async (userId) => {
  try {
    const docRef = doc(firestoreDB, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().userName;
    }
    return '';
  } catch (error) {
    throw error;
  }
};

const handleUpdateUser = async (id, username, dob, introduction, avatar, phone, addressHome, addressWork) => {
  try {
    const updatedUser = await UserDAO.update(id, username, dob, introduction, avatar, phone, addressHome, addressWork);
    if (Object.keys(updatedUser).length === 0) {
      throw Error;
    }
    return updatedUser;
  } catch (error) {
    throw Error;
  }
};

export { handleGetUserById, handleGetNameByUserId, handleUpdateUser };
