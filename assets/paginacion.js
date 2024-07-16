import { buscarPersonaje } from "./busqueda.js";

const maxPaginas = 42;
const paginasVisibles = 5;

const manejarClickPagina = (evento) => {
  evento.preventDefault();
  const pagina = evento.target.getAttribute("data-page");
  let currentPage = parseInt(
    document.querySelector(".page-item.active a").getAttribute("data-page")
  );

  if (pagina === "prev" && currentPage > 1) {
    currentPage--;
  } else if (pagina === "next" && currentPage < maxPaginas) {
    currentPage++;
  } else if (!isNaN(pagina)) {
    currentPage = parseInt(pagina);
  }
  buscarPersonaje(currentPage);
};

const actualizarPaginacion = (currentPage, consulta, noResults = false) => {
  const paginacion = document.getElementById("pagination");
  paginacion.innerHTML = "";

  if (noResults) {
    const itemPagina = document.createElement("li");
    itemPagina.className = `page-item active`;
    const enlacePagina = document.createElement("a");
    enlacePagina.className = "page-link";
    enlacePagina.href = "#";
    enlacePagina.setAttribute("data-page", 1);
    enlacePagina.textContent = 1;
    itemPagina.appendChild(enlacePagina);
    paginacion.appendChild(itemPagina);
    return;
  }

  const itemPrevio = document.createElement("li");
  itemPrevio.className = "page-item";
  itemPrevio.innerHTML = `<a class="page-link" href="#" data-page="prev">Prev</a>`;

  const itemSiguiente = document.createElement("li");
  itemSiguiente.className = "page-item";
  itemSiguiente.innerHTML = `<a class="page-link" href="#" data-page="next">Next</a>`;

  paginacion.appendChild(itemPrevio);

  let paginaInicio = Math.max(currentPage - Math.floor(paginasVisibles / 2), 1);
  let paginaFin = Math.min(paginaInicio + paginasVisibles - 1, maxPaginas);

  if (paginaFin - paginaInicio < paginasVisibles - 1) {
    paginaInicio = Math.max(paginaFin - paginasVisibles + 1, 1);
  }

  for (let i = paginaInicio; i <= paginaFin; i++) {
    const itemPagina = document.createElement("li");
    itemPagina.className = `page-item ${i === currentPage ? "active" : ""}`;
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

export const crearPaginacion = (
  currentPage = 1,
  consulta = "",
  noResults = false
) => {
  actualizarPaginacion(currentPage, consulta, noResults);

  document.querySelectorAll(".page-link").forEach((item) => {
    item.addEventListener("click", manejarClickPagina);
  });
};
