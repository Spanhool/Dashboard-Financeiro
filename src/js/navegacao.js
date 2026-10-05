const app = document.getElementById("app");

async function navegar(pagina, id = null, filtro = null) {
  selecionarPagina(pagina);
  const parametros = new URLSearchParams();

  if (id) {
    parametros.set("id", id);
  }

  if (filtro) {
    parametros.set("filtro", filtro);
  }

  const query = parametros.toString();
  history.pushState(null, "", `index.html${query ? `?${query}` : ""}`);
  const resposta = await fetch(`pages/${pagina}.html`);
  const html = await resposta.text();

  app.innerHTML = html;

  const scripts = {
    dashboard: "src/js/dashboard.js",
    despesa: "src/js/despesa.js",
    receita: "src/js/receita.js",
    movimentacao: "src/js/movimentacao.js",
  };

  const caminhoScript = scripts[pagina];

  if (caminhoScript) {
    const scriptExistente = document.querySelector(
      `script[src="${caminhoScript}"]`,
    );

    if (scriptExistente) {
      if (pagina === "dashboard") {
        iniciarDashboard();
      }

      if (pagina === "despesa") {
        iniciarDespesa();
      }

      if (pagina === "receita") {
        iniciarReceita();
      }

      if (pagina === "movimentacao") {
        iniciarMovimentacao();
      }
    } else {
      const script = document.createElement("script");

      script.src = caminhoScript;

      script.onload = () => {
        if (pagina === "dashboard") {
          iniciarDashboard();
        }

        if (pagina === "despesa") {
          iniciarDespesa();
        }

        if (pagina === "receita") {
          iniciarReceita();
        }

        if (pagina === "movimentacao") {
          iniciarMovimentacao();
        }
      };

      document.body.appendChild(script);
    }
  }
}

document.querySelectorAll("[data-page]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const pagina = link.dataset.page;

    navegar(pagina);
  });
});

app.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-page]");

  if (!link) {
    return;
  }

  event.preventDefault();
  navegar(link.dataset.page, null, link.dataset.filtro || null);
});

function selecionarPagina(pagina) {
  const itens = document.querySelectorAll(".side-item");

  itens.forEach((item) => {
    item.classList.remove("active");
  });

  const itemSelecionado = document.querySelector(
    `.side-item a[data-page="${pagina}"]`,
  );

  if (itemSelecionado) {
    itemSelecionado.parentElement.classList.add("active");
  }
}

navegar("dashboard");
