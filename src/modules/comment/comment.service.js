import { Timestamp, addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebase/firebase-config';
import { handleGetNameByUserId } from '../user/user.service';

const handleGetCommentByExamId = async (examId) => {
  try {
    const firestoreDB = getFirestore(app);
    const q = query(collection(firestoreDB, 'comments'), where('examId', '==', examId));

    const querySnapshot = await getDocs(q);
    let comments = [];

    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const userName = await handleGetNameByUserId(data.userId);
        comments.push({ ...data, userName });
      }),
    );
    return comments;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const addComment = async (examId, userId, content) => {
  console.log(examId, userId, content);
  try {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, 'comments'), {
      examId,
      userId,
      content,
      createdAt: Timestamp.fromDate(new Date()),
    });
    // const docSnap = await getDoc(docRef);

    // console.log({ id: docSnap.id, ...docSnap.data() });
    return {};
  } catch (error) {
    console.long(error);
    throw Error;
  }
};

export { handleGetCommentByExamId, addComment };
