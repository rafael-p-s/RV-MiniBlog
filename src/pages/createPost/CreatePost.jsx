import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  //navigate:
  const navigate = useNavigate();

  //pegando usuário:
  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts"); //está desestruturando a função.

  function handleSubmit(e) {
    e.preventDefault();
    setFormError(""); //zerando erros do formulário

    //validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
      return;
    }

    //criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase()); //"split" vai ajudar a separar as tags como um array. Sendo passado para todos os valores serem minusculos.

    //checar todos os valores

    if (!title || !image || !tags || !body) {
      //Vai verificar se todos os campos estão preenchidos, caso não:
      setFormError("Por favor, preencha todos os campos.");
      return;
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tag: tagsArray,
      uid: user.uid, //está chando e acessando a propriedade uid
      createdBY: user.displayName,
    });

    //redirect to home page
    navigate("/"); //irá enviar o usuário para a home, depois de postar algo
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>
        Escreva sobre aquilo que quiser, para compartilhar seu conhecimento.
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Url da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Url da imagem"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Digite o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Colocar as tags separads por virgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
