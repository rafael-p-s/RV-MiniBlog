import styles from "./DashBoard.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

export function DashBoard() {
  const { user } = useAuthValue();
  const uid = user.uid;

  //posts do usuario
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  function deleteDOcument(id) {}

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>Gerencie os seus posts:</p>
      {loading && <p>Carregando...</p>}
      {!loading && posts && posts.length === 0 && (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      )}
      {posts && posts.length > 0 && (
        <>
          <div className={styles.post_header}>
            <span>Titulo</span>
            <span>Ações</span>
          </div>
          {posts.map((post) => (
            <div key={post.id} className={styles.post_row}>
              <p>{post.title}</p>
              <div>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">
                  Ver
                </Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                  Editar
                </Link>
                <button
                  onClick={() => deleteDocument(post.id)}
                  className="btn btn-outline btn-danger"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
