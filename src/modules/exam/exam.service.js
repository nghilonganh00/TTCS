import { get, getDatabase, ref, set } from 'firebase/database';
import { app } from '../../firebase/firebase-config';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import ExamDAO from './exam.DAO';

const handleGetAllExamGeneralInfo = async () => {
  try {
    const db = getFirestore(app);

    let data = [];

    const querySnapshot = await getDocs(collection(db, 'exams'));
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
      console.log(doc.id, ' => ', doc.data());
    });

    return data;
  } catch (error) {
    throw Error;
  }
};

const handleGetExamGeneralInfoById = async (examId) => {
  try {
    const db = getFirestore(app);

    const docRef = doc(db, 'exams', examId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return {};
    }
  } catch (error) {
    throw Error;
  }
};

const handleGetTittleExam = async (examId) => {
  const db = getDatabase();
  const dbRef = ref(db, `toeic/${examId}`);
  const snapshot = await get(dbRef);
  const examTitle = snapshot.val().title;
  return examTitle;
};

const handleGetCorrectAnswersByExamId = async (examId) => {
  const db = getDatabase();
  const dbRef = ref(db, `toeic/${examId}`);
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    const exam = snapshot.val();

    let correctAnswers = {};
    Object.keys(exam.parts).forEach((partKey) => {
      const part = exam.parts[partKey];
      let correctAnswerOfPart = {};
      Object.keys(part).forEach((questionNumber) => {
        const correctAnswer = part[questionNumber].correctAnswer;
        correctAnswerOfPart[questionNumber] = correctAnswer;
      });

      correctAnswers[partKey] = correctAnswerOfPart;
    });

    return correctAnswers;
  } else {
    throw Error;
  }
};

const handelGetQuestionById = async (id, part, question_id) => {
  const db = getDatabase();
  const dbRef = ref(db, `toeic/${id}/parts/${part}/${question_id}`);
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    const exam = snapshot.val();

    return exam;
  } else {
    throw Error;
  }
};

const handleAddExam = async (examTitle, examYear) => {
  const examId = (await handleGetAllExamGeneralInfo()).length + 1;

  console.log('examId: ', examId);

  const db = getDatabase();
  set(ref(db, 'toeic/' + examId.toString()), {
    id: examId,
    parts: ' ',
  });

  await ExamDAO.add(examTitle, examYear, examId);
};

const handleEditExam = async (examId, examTitle, examYear) => {
  await ExamDAO.edit(examId, examTitle, examYear);
};

const handleDeleteExam = async (examId) => {
  await ExamDAO.delete(examId);
};

export {
  handleGetAllExamGeneralInfo,
  handleGetExamGeneralInfoById,
  handleGetTittleExam,
  handleGetCorrectAnswersByExamId,
  handelGetQuestionById,
  handleAddExam,
  handleEditExam,
  handleDeleteExam,
};
