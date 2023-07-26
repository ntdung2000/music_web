import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAppFirestore } from "../config/firebase";

export namespace getDocumentsWithConditionType {
  export type Condition = {
    fieldName: string;
    operator: WhereFilterOp;
    compareValue: string | number | boolean;
  };
}
export const useGetDocumentsWithCondition = (
  collectionName: string,
  condition: getDocumentsWithConditionType.Condition
) => {
  const [data, setData] = useState<[]>([]);
  const collectionRef = collection(getAppFirestore, collectionName);
  useEffect(() => {
    const q = query(
      collectionRef,
      where(condition.fieldName, condition.operator, condition.compareValue)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as [];
        if (JSON.stringify(docs) !== JSON.stringify(data)) {
          setData(docs);
        }
      }
    );
    return unsubscribe;
  }, []);
  return data;
};

export const useGettAllDocuments = (collectionName: string) => {
  const [data, setData] = useState<[]>([]);
  const collectionRef = collection(getAppFirestore, collectionName);
  const q = query(collectionRef);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        console.log(snapshot);
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as [];
        if (JSON.stringify(docs) !== JSON.stringify(data)) {
          setData(docs);
        }
      }
    );
    console.log(data)
    return () => unsubscribe();
  }, []);
  return data;
};
