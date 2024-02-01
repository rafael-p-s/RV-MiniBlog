import { useLocation } from "react-router-dom";
import { useMemo } from "react";


//Serve para fazer uma comparação, sabendo se o item foi modificado.
export function useQuery() {
  const { search } = useLocation(); //vai pegar os parametros da url, quando a pg é carregada.

  return useMemo(() => new URLSearchParams(search), [search]); //vai buscar o parametro e me entregar o mesmo. Mas essa função só vai ser alterada, quando o search for alterada.
}
