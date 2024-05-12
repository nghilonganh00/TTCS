import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { app } from '../../firebase/firebase-config';

const db = getFirestore(app);

const ExamDAO = {
  getTitleById: async function (examId) {
    try {
      const db = getFirestore(app);
      const docRef = doc(db, 'exams', examId);
      const docSnap = await getDoc(docRef);
      return docSnap.data().title;
    } catch (error) {
      throw Error;
    }
  },

  add: async function (examTitle, examYear, examId) {
    try {
      const docRef = await addDoc(collection(db, 'exams'), {
        title: examTitle,
        year: examYear,
        practiceTotal: 0,
        commentTotal: 0,
        examContentPath: examId,
      });
      return docRef.id;
    } catch (error) {
      throw Error;
    }
  },

  edit: async function (examId, examTitle, examYear) {
    try {
      const db = getFirestore(app);
      const docRef = doc(db, 'exams', examId);

      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log("Exam doesn't exist");
        return {};
      }

      await setDoc(docRef, {
        title: examTitle || docSnap.data().title,
        year: examYear || docSnap.data().year,
        practiceTotal: docSnap.data().practiceTotal,
        commentTotal: docSnap.data().commentTotal,
        examContentPath: docSnap.data().examContentPath,
      });
      const updatedDocSnap = await getDoc(docRef);
      const updatedExam = updatedDocSnap.data();
      return updatedExam;
    } catch (error) {
      return {};
    }
  },

  delete: async function (examId) {
    try {
      await deleteDoc(doc(db, 'exams', examId));
      return '';
    } catch (error) {
      throw Error;
    }
  },

  increasePracticeTotal: async function (examId) {
    try {
      const db = getFirestore(app);
      const docRef = doc(db, 'exams', examId);
      const docSnap = await getDoc(docRef);

      await updateDoc(docRef, {
        practiceTotal: docSnap.data().practiceTotal + 1,
      });
    } catch (error) {
      throw Error;
    }
  },

  searchByTimeFrame: async function (timeFrame) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(timeFrame));

      const docRef = doc(db, 'exams', examId);
      const snapshot = await docRef.orderByChild('created_at').startAt(startDate.toISOString()).once('value');
      const exams = [];

      await updateDoc(docRef, {
        practiceTotal: docSnap.data().practiceTotal + 1,
      });
    } catch (error) {
      throw Error;
    }
  },
};

export default ExamDAO;
