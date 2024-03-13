
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../config";

const db = getFirestore(app);

export default async function getDoument(collection, id) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}