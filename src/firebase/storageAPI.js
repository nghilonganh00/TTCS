import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "./firebase-config";

const storage = getStorage(app);

const StorageAPI = {
  upload: async (file) => {
    const storageRef = ref(storage, "image/" + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("snapshot: ", snapshot);
    });

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {},
    //   (error) => {
    //     // Handle unsuccessful uploads
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       return downloadURL;
    //     });
    //   }
    // );

    return "";
  },
};

export default StorageAPI;
