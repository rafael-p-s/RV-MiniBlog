import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, doc, getDoc } from "firebase/firestore"; //referente aos comandos do banco de dados

//Passando os parametros para fazer a conexão, a busca das tags e validação de usuário.
export function useFetchDocument(docCollection, id) {
  //usuário precisa informar qual ele quer acessar
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (cancelled) return;
      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    }
    loadDocument();
  }, [docCollection, id]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
}
