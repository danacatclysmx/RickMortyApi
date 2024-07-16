export const consultarPersonajesAsync = async (pagina, consulta = "") => {
  const url = consulta
    ? `https://rickandmortyapi.com/api/character/${consulta}&page=${pagina}`
    : `https://rickandmortyapi.com/api/character/?page=${pagina}`;

  const respuesta = await fetch(url);
  if (respuesta.ok) {
    const datos = await respuesta.json();
    return { results: datos.results, info: datos.info };
  }
};

export const consultarPersonaje = async (id) => {
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  return datos;
};
