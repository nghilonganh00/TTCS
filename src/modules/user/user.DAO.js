import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { app } from '../../firebase/firebase-config';
import { set } from 'firebase/database';

const UserDAO = {
  getAll: async function (userId, examId) {
    const db = getFirestore(app);
    let q;
    if (userId && examId) {
      q = query(collection(db, 'examHistory'), where('userId', '==', userId), where('examId', '==', examId));
    } else if (userId) {
      q = query(collection(db, 'examHistory'), where('userId', '==', userId));
    } else {
      q = query(collection(db, 'examHistory'), where('examId', '==', examId));
    }

    const querySnapshot = await getDocs(q);
    let examHistory = [];
    querySnapshot.forEach((doc) => {
      examHistory.push({ id: doc.id, ...doc.data() });
    });

    return examHistory;
  },

  getById: async function (userId) {
    const docRef = doc(firestoreDB, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    return '';
  },

  update: async function (id, username, dob, introduction, avatar, phone, addressHome, addressWork) {
    try {
      const db = getFirestore(app);
      const docRef = doc(db, 'users', id);

      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log("User doesn't exist");
        return {};
      }

      await setDoc(docRef, {
        username: username || docSnap.data().username,
        dob: dob || docSnap.data().dob,
        addressHome: addressHome || docSnap.data().addressHome,
        addressWork: addressWork || docSnap.data().addressWork,
        phone: phone || docSnap.data().phone,
        introduction: introduction || docSnap.data().introduction,
        avatarPath: avatar || docSnap.data().avatarPath,
        createdAt: docSnap.data().createdAt,
        lastResetPassword: docSnap.data().lastResetPassword,
        email: docSnap.data(),
      });
      console.log(id);
      const updatedDocSnap = await getDoc(docRef);
      const updatedUser = updatedDocSnap.data();
      return updatedUser;
    } catch (error) {
      return {};
    }
  },
};

export default UserDAO;
