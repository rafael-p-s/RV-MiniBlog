import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore"; //no FireBase não são tabela, tudo no FireBase é salvo em uma colection.

//Passando estado inicial para o useReducer:
const initialState = {
  loading: null,
  error: null,
};
function insertReducer(state, action) {
  //criando os casos que podem ocorrer:
  switch (
    action.type //checagem das ações:
  ) {
    case "LOADING":
      //caso tenha LOADING:
      return { loading: true, error: null };
    case "INSERTED_DOC":
      //termina o caso de loading
      return { loading: false, error: null };
    case "ERROR":
      //caso tenha erro, será enviado para esse "action"
      return { loading: false, error: action.payload };
    default: //caso tudo dê errado:
      return state;
  }
}

export function useInsertDocument(docCollection) {
  //está recebendo o docCollection, para que seja passado a infromação do FireBase, podendo ser qualquer um.
  const [response, dispatch] = useReducer(insertReducer, initialState); //está passando qual função vai tratar dos reducer e o estádo inicial, sem loading e erro.

  //deal with memory leak:
  const [cancelled, setcancelled] = useState(false); //não ter vazamento de memoria

  //Vai verificar se está cancelado ou não:
  function checkCancelBeforeDispach(action) {
    if (!cancelled) dispatch(action);
  }

  //Vai receber um document, que o usuário quer inserir:
  async function insertDocument(document) {
    checkCancelBeforeDispach({
      type: "LOADING",
    });
    try {
      //vai pegar os dados que vão ser passados para essa função
      //Sendo criado um objeto, que vai passar todas as informações + o Timestamp, para o newDocument
      //O operador de propagação (...) é utilizado para copiar todas as propriedades de document para o novo objeto.
      //O nome disso é: *** operador de propagação/rest, ***
      const newDocument = { ...document, createdAt: Timestamp.now() };

      //criando uma função com o resultado da inserção:
      const insertedDocument = await addDoc(
        //Passando o collection, método passado, junto com o DB.
        //Que basicamente vai passar nosso banco de dados para ser buscado.
        collection(db, docCollection),
        newDocument //inserindo o novo document.
      );

      //como está tendo toda uma ação, é necessário informar:
      checkCancelBeforeDispach({
        //document inserido:
        type: "INSERTED_DOC",
        payload: insertDocument,
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

  return { insertDocument, response }; //recebe a confirmação se o document realmente foi gravado no bd.
  return <></>;
}
