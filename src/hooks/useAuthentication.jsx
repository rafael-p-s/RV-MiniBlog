import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export function useAuthentication() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // clearup, para fazer limpeza de memoria
  const [cancelled, setCancelled] = useState(false); //vai ser cancelado, se der tudo certo.

  //fazendo autenticação:
  const auth = getAuth();
  //criar uma função para autenticação:
  function checkIfIsCancelled() {
    //Essa parte vai server para evitar vazamento de memoria.
    if (cancelled) {
      return;
    }
  }
  //Register
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null); //limpando erros.

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      //caso a senha seja "fraca", na hora de enviar ira dar um erro do próprio FireBase.
      //Agora será feito um tratamento para esses errors, passando de inglês para pt-br
      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setLoading(false);
      setError(systemErrorMessage);
    }
  };
  //Logout - sign out
  function logout() {
    checkIfIsCancelled();
    signOut(auth);
  }

  //login - sign in
  async function login(data) {
    checkIfIsCancelled(); // verificação de memoria
    setLoading(true);
    setError(null);
    console.log(data);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message); 

      let systemErrorMessage;
      if (error.message.includes("auth/invalid-credential")) {
        systemErrorMessage = "E-mail ou senha incorretos, verificar.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }
      console.error("Error Firebase>>>", error.message);
      setError(systemErrorMessage);
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
}
