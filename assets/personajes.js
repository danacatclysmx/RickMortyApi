import { consultarPersonaje, consultarPersonajesAsync } from "./api.js";

export const pintarPersonajes = async (pagina, consulta = "") => {
  const datos = await consultarPersonajesAsync(pagina, consulta);
  const cuerpoTabla = document.getElementById("bodyTable");
  cuerpoTabla.innerHTML = "";
  let contador = (pagina - 1) * 20 + 1;
  datos.forEach((personaje) => {
    const tr = document.createElement("tr");

    const tdContador = document.createElement("td");
    const tdNombre = document.createElement("td");
    const tdImagen = document.createElement("td");
    const tdEstado = document.createElement("td");
    const tdEspecie = document.createElement("td");
    const tdGenero = document.createElement("td");
    const tdOrigen = document.createElement("td");

    const imagen = document.createElement("img");
    imagen.src = personaje.image;
    imagen.alt = personaje.name;
    imagen.width = 50;

    tdContador.textContent = contador;

    tdNombre.innerHTML = `<a
    class="modal-button"
    id="personaje-${personaje.id}"
    data-bs-toggle="modal"
    data-bs-target="#modal"
  >
    ${personaje.name}
  </a>`;
    tdImagen.appendChild(imagen);
    tdEstado.textContent = personaje.status;
    tdEspecie.textContent = personaje.species;
    tdGenero.textContent = personaje.gender;
    tdOrigen.textContent = personaje.origin.name;

    tr.appendChild(tdContador);
    tr.appendChild(tdNombre);
    tr.appendChild(tdImagen);
    tr.appendChild(tdEstado);
    tr.appendChild(tdEspecie);
    tr.appendChild(tdGenero);
    tr.appendChild(tdOrigen);

    cuerpoTabla.appendChild(tr);
    document
      .getElementById(`personaje-${personaje.id}`)
      .addEventListener("click", () => {
        pintarPersonaje(personaje.id);
      });
    contador++;
  });
};
const pintarPersonaje = async (id) => {
  const datos = await consultarPersonaje(id);
  console.log(datos);
  document.querySelector(".modal-title").textContent = datos.name;
  const body = document.querySelector(".modal-body");
  body.innerHTML = "";

  const tabla = document.createElement("table");
  tabla.className = "table table-danger";

  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  const thName = document.createElement("th");
  const thStatus = document.createElement("th");
  const thSpecie = document.createElement("th");
  const thGender = document.createElement("th");
  const thOrigin = document.createElement("th");
  const thImg = document.createElement("th");

  thName.textContent = "Name";
  thStatus.textContent = "Status";
  thSpecie.textContent = "Specie";
  thGender.textContent = "Gender";
  thOrigin.textContent = "Origin";
  thImg.textContent = "Img";

  trHead.appendChild(thName);
  trHead.appendChild(thStatus);
  trHead.appendChild(thSpecie);
  trHead.appendChild(thGender);
  trHead.appendChild(thOrigin);
  trHead.appendChild(thImg);

  thead.appendChild(trHead);
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");
  const trBody = document.createElement("tr");

  const tdName = document.createElement("td");
  const tdStatus = document.createElement("td");
  const tdSpecie = document.createElement("td");
  const tdGender = document.createElement("td");
  const tdOrigin = document.createElement("td");
  const tdImg = document.createElement("td");

  tdName.textContent = datos.name;
  tdStatus.textContent = datos.status;
  tdSpecie.textContent = datos.species;
  tdGender.textContent = datos.gender;
  tdOrigin.textContent = datos.origin.name;

  const img = document.createElement("img");
  img.src = datos.image;
  img.className = "rounded img-thumbnail";
  img.alt = datos.name;

  tdImg.appendChild(img);

  trBody.appendChild(tdName);
  trBody.appendChild(tdStatus);
  trBody.appendChild(tdSpecie);
  trBody.appendChild(tdGender);
  trBody.appendChild(tdOrigin);
  trBody.appendChild(tdImg);

  tbody.appendChild(trBody);
  tabla.appendChild(tbody);

  body.appendChild(tabla);
};
