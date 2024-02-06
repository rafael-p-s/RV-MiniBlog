import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore"; //no FireBase não são tabela, tudo no FireBase é salvo em uma colection.

//Passando estado inicial para o useReducer:
const initialState = {
  loading: null,
  error: null,
};
function deleteReducer(state, action) {
  //criando os casos que podem ocorrer:
  switch (
    action.type //checagem das ações:
  ) {
    case "LOADING":
      //caso tenha LOADING:
      return { loading: true, error: null };
    case "DELETED_DOC":
      //termina o caso de loading
      return { loading: false, error: null };
    case "ERROR":
      //caso tenha erro, será enviado para esse "action"
      return { loading: false, error: action.payload };
    default: //caso tudo dê errado:
      return state;
  }
}

export function useDeleteDocument(docCollection) {
  const [response, dispatch] = useReducer(deleteReducer, initialState);
  //deal with memory leak:
  const [cancelled, setcancelled] = useState(false); //não ter vazamento de memoria

  //Vai verificar se está cancelado ou não:
  function checkCancelBeforeDispach(action) {
    if (!cancelled) dispatch(action);
  }

  async function deleteDocument(id) {
    checkCancelBeforeDispach({
      type: "LOADING",
    });
    try {
      const deletedDocument = await deleteDoc(doc(db, docCollection, id));

      checkCancelBeforeDispach({
        type: "DELETED_DOC",
        payload: deleteDocument,
      });
    } catch (error) {
      checkCancelBeforeDispach({
        type: "ERROR",
        payload: error.message,
      });
    }
  }

  useEffect(() => {
    return () => setcancelled(true);
  }, []);

  return { deleteDocument, response };
}
