import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore"; //no FireBase não são tabela, tudo no FireBase é salvo em uma colection.

//Passando estado inicial para o useReducer:
const initialState = {
  loading: null,
  error: null,
};
function updateReducer(state, action) {
  //criando os casos que podem ocorrer:
  switch (
    action.type //checagem das ações:
  ) {
    case "LOADING":
      //caso tenha LOADING:
      return { loading: true, error: null };
    case "UPDATED_DOC":
      //termina o caso de loading
      return { loading: false, error: null };
    case "ERROR":
      //caso tenha erro, será enviado para esse "action"
      return { loading: false, error: action.payload };
    default: //caso tudo dê errado:
      return state;
  }
}

export function useUpdateDocument(docCollection) {
  //está recebendo o docCollection, para que seja passado a infromação do FireBase, podendo ser qualquer um.
  const [response, dispatch] = useReducer(updateReducer, initialState); //está passando qual função vai tratar dos reducer e o estádo inicial, sem loading e erro.

  //deal with memory leak:
  const [cancelled, setcancelled] = useState(false); //não ter vazamento de memoria

  //Vai verificar se está cancelado ou não:
  function checkCancelBeforeDispach(action) {
    if (!cancelled) dispatch(action);
  }

  //Vai receber um document, que o usuário quer inserir:
  async function updateDocument(id, data) {
    checkCancelBeforeDispach({
      type: "LOADING",
    });
    try {
      const docRef = await doc(db, docCollection, id);

      const updatedDocument = await updateDoc(docRef, data);

      //como está tendo toda uma ação, é necessário informar:
      checkCancelBeforeDispach({
        //document inserido:
        type: "UPDATED_DOC",
        payload: updatedDocument,
      });
    } catch (error) {
      checkCancelBeforeDispach({
        //caso tenha erro:
        type: "ERROR",
        payload: error.message,
      });
    }
  }

  useEffect(() => {
    return () => setcancelled(true);
  }, []);

  return { updateDocument, response }; //recebe a confirmação se o document realmente foi gravado no bd.
}
