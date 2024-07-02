export const consultarPersonajesAsync = async (pagina, consulta = "") => {
  const url = consulta
    ? `https://rickandmortyapi.com/api/character/?name=${consulta}&page=${pagina}`
    : `https://rickandmortyapi.com/api/character/?page=${pagina}`;
  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  return datos.results;
};
