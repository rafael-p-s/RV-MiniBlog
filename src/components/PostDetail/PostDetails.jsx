import styles from "./PostDetail.module.css";

import { Link } from "react-router-dom";

export function PostDetail({ post }) {
  return (
    <>
      <div className={styles.post_detail}>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className={styles.createdBy}>{post.createBy}</p>
        <div className={styles.tags}>
          {Array.isArray(post.tags) &&
            post.tags.map((tag) => {
              <p>
                <span>#</span>
                {tag}
              </p>;
            })}
        </div>
        <Link to={`/posts/${post.id}`} className="btn btn-outline">
          Ler
        </Link>
      </div>
    </>
  );
}
