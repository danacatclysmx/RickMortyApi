import { pintarPersonajes } from "./personajes.js";

let contador = 1;
const maxPaginas = 42;
const paginasVisibles = 5;

const manejarClickPagina = (evento) => {
  evento.preventDefault();
  const pagina = evento.target.getAttribute("data-page");
  if (pagina === "prev" && contador > 1) {
    contador--;
  } else if (pagina === "next" && contador < maxPaginas) {
    contador++;
  } else if (!isNaN(pagina)) {
    contador = parseInt(pagina);
  }
  pintarPersonajes(
    contador,
    document.getElementById("searchInput").value.trim()
  );
  actualizarPaginacion();
};

const actualizarPaginacion = () => {
  const paginacion = document.getElementById("pagination");
  const itemPrevio = paginacion.querySelector('a[data-page="prev"]').parentNode;
  const itemSiguiente = paginacion.querySelector(
    'a[data-page="next"]'
  ).parentNode;

  paginacion.innerHTML = "";
  paginacion.appendChild(itemPrevio);

  let paginaInicio = Math.max(contador - Math.floor(paginasVisibles / 2), 1);
  let paginaFin = Math.min(paginaInicio + paginasVisibles - 1, maxPaginas);

  if (paginaFin - paginaInicio < paginasVisibles - 1) {
    paginaInicio = Math.max(paginaFin - paginasVisibles + 1, 1);
  }

  for (let i = paginaInicio; i <= paginaFin; i++) {
    const itemPagina = document.createElement("li");
    itemPagina.className = `page-item ${i === contador ? "active" : ""}`;
    const enlacePagina = document.createElement("a");
    enlacePagina.className = "page-link";
    enlacePagina.href = "#";
    enlacePagina.setAttribute("data-page", i);
    enlacePagina.textContent = i;
    itemPagina.appendChild(enlacePagina);
    paginacion.appendChild(itemPagina);
  }

  paginacion.appendChild(itemSiguiente);
  document.querySelectorAll(".page-link").forEach((item) => {
    item.removeEventListener("click", manejarClickPagina);
    item.addEventListener("click", manejarClickPagina);
  });
};

export const crearPaginacion = () => {
  actualizarPaginacion();

  document.querySelectorAll(".page-link").forEach((item) => {
    item.addEventListener("click", manejarClickPagina);
  });
};
