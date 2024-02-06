import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export function useFetchDocuments(docCollection, search = null, uid = null) {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;
      setLoading(true);
      const collectionRef = await collection(db, docCollection);

      try {
        let q;
        if (search) {
          (q = query(
            collectionRef,
            where("tags", "array-contains", search)
          )),
            orderBy("createAt", "desc");
        } else if (uid) {
          (q = query(collectionRef, where("uid", "==", uid))),
            orderBy("createAt", "desc");
        } else {
          q = query(collectionRef, orderBy("createAt", "desc"));
        }

        //mapear os dados
        await onSnapshot(q, (querySnapshot) => {
          //executar uma função para vir com os docs do FireBase
          setDocuments(
            //fazendo um mapeamento, para acessar os docs para verificar os dados que veio
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);

        setLoading(false);
      }
    }
    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
}
