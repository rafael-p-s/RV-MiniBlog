import styles from "./Login.module.css";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

export function Login() {
  // Fazendo a parte que não envolve o back-end
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); //referente a error.

  //fazendo linkagem com o useAuthentication
  // const { createUser, error: authError, loading } = useAuthentication; << se eu chamar desse jeito irá dar um erro no momento do cadastro, a MANEIRA CERTA:

  const { login, error: authError, loading } = useAuthentication(); // agora precisa importar no useAthutentication o arquivo "db"

  async function handleSubmit(e) {
    e.preventDefault();

    setError(""); //está zerando os erros.
    const user = {
      //está formando o usuário.
      email,
      password,
    };

    //Está vindo uma resposta de qual usuário está sendo acessado:
    const res = await login(user);

    console.log(user);
  }

  //irá mapear se o setError mudou:
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]); // com isso, fica verificando se o setError mudou

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="text"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Senha do usuário"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {/* Botão já carregado para cadastro */}
        {!loading && <button className="btn">Entrar</button>}
        {/* Botão carregando para cadastrar. */}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
