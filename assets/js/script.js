const $button = document.getElementById("button");
const $nombre = document.getElementById("nombre");
const $pagina = document.getElementById("pagina");
const $repoPagina = document.getElementById("repoPagina");
const $resultados = document.getElementById("resultados");

async function request(usuario, pagina = false, cantidad_repos = false) {
  if (pagina == false || cantidad_repos == false) {
    let response = await fetch(` https://api.github.com/users/${usuario}`);
    let data = await response.json();
    return data;
  } else {
    let response = await fetch(
      ` https://api.github.com/users/${usuario}/repos?page=${pagina}&per_page=${cantidad_repos}.`
    );
    let data = await response.json();
    return data;
  }
}

async function getUser(nombreUsuario) {
  const data = await request(nombreUsuario);
  return data;
}

async function getRepo(nombreUsuario, paginaUsuario, repoPaginaUsuario) {
  const data = await request(nombreUsuario, paginaUsuario, repoPaginaUsuario);
  return data;
}

$button.addEventListener("click", async function () {
  const nombreUsuario = $nombre.value;
  const paginaUsuario = $pagina.value;
  const repoPaginaUsuario = $repoPagina.value;

  const dataUsuario = await getUser(nombreUsuario);
  const dataRepo = await getRepo(
    nombreUsuario,
    paginaUsuario,
    repoPaginaUsuario
  );
});
