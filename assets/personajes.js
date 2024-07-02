import { consultarPersonajesAsync } from "./api.js";

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
    tdNombre.textContent = personaje.name;
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
    contador++;
  });
};
