export const consultarPersonajesAsync = async (pagina, consulta = "") => {
  const url = consulta
    ? `https://rickandmortyapi.com/api/character/${consulta}&page=${pagina}`
    : `https://rickandmortyapi.com/api/character/?page=${pagina}`;
  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  return datos.results;
};

export const consultarPersonaje = async (id) => {
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  return datos;
};
