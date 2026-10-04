const app = document.getElementById("app");

async function navegar(pagina, id = null) {
  const parametro = id ? `?id=${id}` : "";
  history.pushState(null, "", `index.html${parametro}`);
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

navegar("dashboard");
