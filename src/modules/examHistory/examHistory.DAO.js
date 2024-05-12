import { Timestamp, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebase/firebase-config';
import ExamDAO from '../exam/exam.DAO';

const ExamHistoryDAO = {
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
    let examHistories = [];

    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const { examId } = doc.data();
        const examTitle = await ExamDAO.getTitleById(examId);
        examHistories.push({ id: doc.id, examTitle, ...doc.data() });
      }),
    );

    return examHistories;
  },

  getById: async function (examHistoryId) {
    const db = getFirestore(app);
    const docRef = doc(db, 'examHistory', examHistoryId);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? docSnap.data() : {};
  },

  getByExamId: async function (examId) {
    try {
      const db = getFirestore(app);
      const q = query(collection(db, 'examHistory'), where('examId', '==', examId));

      const querySnapshot = await getDocs(q);
      let examHistory = [];
      querySnapshot.forEach((doc) => {
        const { spentTime, parts, examId, correctTotal, questionTotal, examedAt } = doc.data();
        examHistory.push({
          id: doc.id,
          correctTotal,
          questionTotal,
          spentTime,
          parts,
          examId,
          examedAt,
        });
      });

      return examHistory;
    } catch (error) {
      console.log('error: ', error);
    }
  },

  getByUserIdAndTimeFrame: async function (userId, timeFrame) {
    try {
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - timeFrame);
      const startTimestamp = Timestamp.fromDate(new Date(startDate.toISOString()));

      const db = getFirestore(app);
      const q = query(
        collection(db, 'examHistory'),
        // where('userId', '==', userId),
        where('examedAt', '>=', startTimestamp),
      );

      const querySnapshot = await getDocs(q);
      let examHistory = [];
      querySnapshot.forEach((doc) => {
        const { spentTime, parts, examId, correctTotal, questionTotal, examedAt } = doc.data();
        examHistory.push({
          id: doc.id,
          correctTotal,
          questionTotal,
          spentTime,
          parts,
          examId,
          examedAt,
        });
      });

      return examHistory;
    } catch (error) {
      console.log('error: ', error);
    }
  },
};

export default ExamHistoryDAO;
