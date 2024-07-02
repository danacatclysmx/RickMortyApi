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
  body.innerHTML = `
  <table class="table table-danger">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Specie</th>
        <th>Gender</th>
        <th>Origin</th>
        <th>Img</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${datos.name}</td>
        <td>${datos.status}</td>
        <td>${datos.species}</td>
        <td>${datos.gender}</td>
        <td>${datos.origin.name}</td>
        <td><image src="${datos.image}" class="rounded img-thumbnail" /></td>
      </tr>
    </tbody>
  </table>
  `;
};
