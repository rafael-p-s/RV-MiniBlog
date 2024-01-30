import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore"; //referente aos comandos do banco de dados

//Passando os parametros para fazer a conexão, a busca das tags e validação de usuário.
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
       let callQuery = await query(collectionRef, orderBy("createdAt", "asc")); //está chamando por ordem de validade de criação, mais novos primeiro.

        //mapear os dados
        await onSnapshot(callQuery, (querySnapshot) => {
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
    };
    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
  
}

