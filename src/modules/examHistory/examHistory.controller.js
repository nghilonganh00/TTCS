import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../firebase/firebase-config';
import { getAllPreview } from './examHistory.service';

const handleGetAllPreview = async (req, res) => {
  try {
    const { userId, examId } = req.query;
    const data = await getAllPreview(userId, examId);

    return res.status(200).json({
      data: data,
      message: 'Fetch exam history preview successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: 'Internal server error',
    });
  }
};

const handleGetById = async (req, res) => {
  try {
    const examHistoryId = req.params.id;

    const db = getFirestore(app);
    const docRef = doc(db, 'examHistory', examHistoryId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return res.status(200).json({
        data: docSnap.data(),
        message: 'Get successfully exam history by id',
      });
    } else {
      return res.status(400).json({
        data: null,
        message: 'The exam history not exist',
      });
    }
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: 'Internal server error',
    });
  }
};

export default { handleGetAllPreview, handleGetById };
