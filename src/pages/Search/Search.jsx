import styles from "./Search.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { PostDetail } from "../../components/PostDetail/PostDetails";
import { Link } from "react-router-dom";

export function Search() {
  //Pegando o parametro HTML:
  const query = useQuery();
  const search = query.get("q"); //está pegando referente ao "q" passando nessa linha de comando: return Navigate(`/search?q=${query}`), do documento Home

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {posts &&
          posts.map((post) => {
            return <PostDetail key={post.id} post={post} />;
          })}
      </div>
    </div>
  );
}
