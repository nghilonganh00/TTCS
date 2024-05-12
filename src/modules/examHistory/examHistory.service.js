import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebase/firebase-config';
import { handleGetTittleExam } from '../exam/exam.service';
import ExamHistoryDAO from './examHistory.DAO';

const getAllPreview = async (userId, examId) => {
  const examHistories = await ExamHistoryDAO.getAll(userId, examId);
  const previewExamHistories = examHistories.map((item) => {
    const { result, ...rest } = item;
    return rest;
  });

  return previewExamHistories;
};

const getAllPreviewByUserId = async (userId) => {
  try {
    const db = getFirestore(app);
    const q = query(collection(db, 'examHistory'), where('userId', '==', userId));

    const querySnapshot = await getDocs(q);
    const examHistories = [];

    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const examTitle = await handleGetTittleExam(data.examId);
        examHistories.push({ ...data });
      }),
    );
    return examHistories;
  } catch (error) {
    throw Error;
  }
};

const handleAddExamHistory = async (history) => {
  try {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, 'examHistory'), history);
    return docRef.id;
  } catch (error) {
    throw Error;
  }
};

export { getAllPreview, handleAddExamHistory, getAllPreviewByUserId };
