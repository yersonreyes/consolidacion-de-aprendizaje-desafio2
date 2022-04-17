const $button = document.getElementById("button");
const $nombre = document.getElementById("nombre");
const $pagina = document.getElementById("pagina");
const $repoPagina = document.getElementById("repoPagina");
const $resultados = document.getElementById("resultados");

async function request(usuario, pagina = false, cantidad_repos = false) {
  try {
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
  } catch (error) {
    console.log(error);
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

  $resultados.innerHTML = `
  <div class="row">
  <div class="col-6">
    <h3>Datos de usuario</h3>
    <img class="img-fluid" src=${dataUsuario.avatar_url} alt="">
    <p>Nombre de usuario: ${dataUsuario.name}</p>
    <p>Nombre de Login: ${dataUsuario.login}</p>
    <p>Cantidad de Repositorios: ${dataUsuario.public_repos}</p>
    <p>Localidad: ${dataUsuario.location}</p>
    <p>Tipo de usuario: ${dataUsuario.type}</p>
  </div>
  <div class="col-6">
  <h3>Nombre de repositorios</h3>
  ${
    dataRepo[0]
      ? dataRepo.slice(0, 10).map((repo) => {
          return `<p><a href=${repo.url}>${repo.name}</a></p>`;
        })
      : ""
  }
  </div>
</div>

  `;
});
