import { getDatabase, ref as databaseRef, set } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";

const addNewQuestion = async (
  year: string,
  practiceSet: string,
  part: string,
  order: string,
  images: File[] | null,
  audio: File[] | null,
  topic: string,
  answer_a: string,
  answer_b: string,
  answer_c: string,
  answer_d: string,
  correct_answer: string
) => {
  const firebaseConfig = {
    apiKey: "AIzaSyAFOoqKnTsipjqH2cXOS__T609IzpXKEpE",
    authDomain: "ttcs-v2.firebaseapp.com",
    databaseURL:
      "https://ttcs-v2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ttcs-v2",
    storageBucket: "ttcs-v2.appspot.com",
    messagingSenderId: "148266489126",
    appId: "1:148266489126:web:4dae4ae185ea673f1e5de7",
    measurementId: "G-FD3PZSWW9L",
  };

  initializeApp(firebaseConfig);
  const db = getDatabase();
  const storage = getStorage();

  try {
    let imageURL = "";
    let audioURL = "";
    const questionId = `${order.toString()}`;
    const toeicRef = databaseRef(
      db,
      "toeic/1/parts/" + part.trim() + "/" + questionId
    );

    const uploadImagePromise = new Promise<void>((resolve, reject) => {
      if (images && images.length > 0) {
        const imgRef = storageRef(storage, `image/${images[0].name}`);
        uploadBytes(imgRef, images[0]);
        const uploadTask = uploadBytesResumable(imgRef, images[0]);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // update progress
            console.log(percent);
          },
          (err) => {
            console.log(err);
            reject(err);
          },
          async () => {
            // download url
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            imageURL = url;
            resolve();
          }
        );
      } else {
        resolve();
      }
    });

    const uploadAudioPromise = new Promise<void>((resolve, reject) => {
      if (audio && audio.length > 0) {
        const audioRef = storageRef(storage, `audio/${audio[0].name}`);
        uploadBytes(audioRef, audio[0]);
        const uploadTask = uploadBytesResumable(audioRef, audio[0]);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // update progress
            console.log(percent);
          },
          (err) => {
            console.log(err);
            reject(err);
          },
          async () => {
            // download url
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            audioURL = url;
            resolve();
          }
        );
      } else {
        resolve();
      }
    });

    await Promise.all([uploadImagePromise, uploadAudioPromise]);

    await set(toeicRef, {
      topic: topic,
      answers: {
        A: answer_a,
        B: answer_b,
        C: answer_c,
        D: answer_d,
      },
      correctAnswer: "A",
      image: imageURL,
      audio: audioURL,
    });
  } catch (error) {
    console.error("Error writing to Firebase:", error);
    throw error;
  }
};

export { addNewQuestion };
