import styles from "./Register.module.css";

import { useState, useEffect } from "react";

export function Register() {
  return (
    <>
      <div>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário aqui...</p>
        <form>
          <label>
            <span>Nome:</span>
            <input
              type="text"
              name="displayName"
              required
              placeholder="Nome do usuário"
            />
          </label>
          <label>
            <span>E-mail:</span>
            <input
              type="text"
              name="email"
              required
              placeholder="E-mail do usuário"
            />
          </label>
          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="password"
              required
              placeholder="Senha do usuário"
            />
          </label>
          <label>
            <span>Confirmação da Senha:</span>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirmar senha"
            />
          </label>
          <button className="btn">Cadastrar</button>
        </form>
      </div>
    </>
  );
}
