import styles from "./About.module.css";
import { Link } from "react-router-dom";
export function About() {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o mini <span>Blog</span>
      </h2>
      <p>
        Este projeto consiste em um blog feito com React.js no front-end e
        FireBase no back-end.
      </p>
      <Link to="/posts/create" className="btn">
        Criar post
      </Link>
    </div>
  );
}
