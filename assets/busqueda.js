import { pintarPersonajes } from "./personajes.js";
import { crearPaginacion } from "./paginacion.js";

let currentPage = 1;

const Filtro = () => {
  const name = document.getElementById("filterName").value.trim();
  const status = document.getElementById("filterStatus").value;
  const species = document.getElementById("filterSpecies").value.trim();
  const gender = document.getElementById("filterGender").value;

  let query = [];

  if (name) query.push(`name=${name}`);
  if (status) query.push(`status=${status}`);
  if (species) query.push(`species=${species}`);
  if (gender) query.push(`gender=${gender}`);

  return query.length ? `?${query.join("&")}` : "";
};

export const buscarPersonaje = async (page = 1) => {
  const consulta = Filtro();
  currentPage = page;
  await pintarPersonajes(currentPage, consulta);
  crearPaginacion(currentPage, consulta);
};
