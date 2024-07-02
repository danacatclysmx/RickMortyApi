import { pintarPersonajes } from "./personajes.js";
import { crearPaginacion } from "./paginacion.js";

let contador = 1;

export const buscarPersonaje = async () => {
  const consulta = document.getElementById("searchInput").value.trim();
  contador = 1;
  await pintarPersonajes(contador, consulta);
  crearPaginacion(consulta);
};
