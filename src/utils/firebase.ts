import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getAppFirestore } from "../config/firebase";
export const addDocumentToCollection = async (
  collectionName: string,
  data: object
) => {
  console.log(collectionName, data);
  try {
    const collectionRef = collection(getAppFirestore, collectionName);
    await addDoc(collectionRef, data);
  } catch (error) {
    console.log(error);
  }
};
