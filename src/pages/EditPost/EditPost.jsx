import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

export function EditPost() {
  const { id } = useParams();
  const { document: post, loading, error } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      setTags(post.tags); // define as tags como um array diretamente
    }
  }, [post]);

  //navigate:
  const navigate = useNavigate();

  //pegando usuário:
  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts"); //está desestruturando a função.

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

    const data = {
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid, //está chando e acessando a propriedade uid
      createdBY: user.displayName,
    };

    updateDocument(id, data);

    //redirect to home page
    navigate("/dashboard"); //irá enviar o usuário para a home, depois de postar algo
  }
  if (loading) {
    return <p>Carregando...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando Post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>

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
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
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
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
}
