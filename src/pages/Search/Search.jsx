import styles from "./Search.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

export function Search() {
    //Pegando o parametro HTML:
    const query = useQuery();
    const search = query.get("q"); //está pegando referente ao "q" passando nessa linha de comando: return Navigate(`/search?q=${query}`), do documento Home

  return (
    <>
      <h2>Search</h2>
      <p>{search}</p>
    </>
  );
}
