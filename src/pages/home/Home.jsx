import styles from "./Home.module.css";

//hooks
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { PostDetail } from "../../components/PostDetail/PostDetails";

export function Home() {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts"); //fazendo extrassão do outro arquivo

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    console.log(posts);
  }, []);
  useEffect(() => {
    console.log("Posts:", posts);
  }, [posts]);

  return (
    <div className={styles.home}>
      <h1>Posts mais recentes:</h1>
      <hr />
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder="Ou busque por tags..." />
        <button
          className="btn btn-dark"
          onChange={(e) => setQuery(e.target.value)}
        >
          Pesquisar
        </button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {/* {posts &&
          posts.length > 0 &&
          posts.map((post) => <h3 key={post.id}>{post.title}</h3>)} */}
        {posts?.length
          ? posts.map((post) => <PostDetail key={post.id} post={post} />)
          : ""}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
