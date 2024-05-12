import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebase/firebase-config';
import { addComment, handleGetCommentByExamId } from './comment.service';

const getCommentByExamId = async (req, res) => {
  try {
    const { examId } = req.query;

    const comments = await handleGetCommentByExamId(examId);

    return res.status(200).json({
      data: comments,
      message: 'Successfully retrieved comments by examId',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: 'Internal server error',
    });
  }
};

const getCommentByUserId = async (req, res) => {
  try {
    const { examId, userId } = req.body;
    const db = getDatabase();
    const dbRef = ref(db, `toeic/${examId}`);
    const snapshot = await get(dbRef);

    const firestoreDB = getFirestore(app);
    const q = query(
      collection(firestoreDB, 'examHistory'),
      where('userId', '==', userId),
      where('examId', '==', examId),
    );

    const querySnapshot = await getDocs(q);
    let examHistory = [];
    querySnapshot.forEach((doc) => {
      examHistory.push(doc.data());
    });

    if (snapshot.exists()) {
      const exam = snapshot.val();
      return res.status(200).json({
        data: {
          exam,
          history: examHistory,
        },
        message: 'Get detail exam successful',
      });
    } else {
      return res.status(404).json({
        data: null,
        message: 'No data available',
      });
    }
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: 'Internal server error',
    });
  }
};

const handleAddComment = async (req, res) => {
  try {
    const { examId, userId, content } = req.body;
    const newComment = await addComment(examId, userId, content);

    return res.status(201).json({
      data: newComment,
      message: 'Add comment successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: 'Internal server error',
    });
  }
};

export default { getCommentByExamId, getCommentByUserId, handleAddComment };
