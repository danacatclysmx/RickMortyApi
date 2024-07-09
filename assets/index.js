import { pintarPersonajes } from "./personajes.js";
import { crearPaginacion } from "./paginacion.js";
import { buscarPersonaje } from "./busqueda.js";

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", async function () {
  await buscarPersonaje();
});

document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    await buscarPersonaje();
  });

document.getElementById("clearButton").addEventListener("click", function () {
  searchInput.value = "";
  buscarPersonaje();
});

document
  .getElementById("filterForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    await buscarPersonaje();
  });

crearPaginacion();
pintarPersonajes(1);
