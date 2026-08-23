let movimentacao = JSON.parse(localStorage.getItem("movimentacao") || "[]"); // Recupera a lista de movimentações do localStorage, ou cria uma nova lista vazia se não existir
const container = document.getElementById("movimentacao-lista"); // Seleciona a lista de movimentacoes
const btnFiltro = document.querySelectorAll("#botoes-filtro button");
const btnFiltroAtivo = document.querySelector("#botoes-filtro button.active");

function formatarData(data) {
  const partesData = data.split("-"); // Divide a data em partes (ano, mês, dia)
  const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`; // Formata a data para o formato dd/mm/aaaa
  return dataFormatada;
}

// Renderiza a lista de movimentacoes
function renderizarLista(lista) {
  let html = "";

  lista.forEach(function (item) {
    let sinal = "";

    if (item.tipo === "receita") {
      sinal = "+";
    } else {
      sinal = "-";
    }

    html += `
    <div class="movimentacao-item">
      <div class="movimentacao-item-info">
        <div class="movimentacao-item-info-tipo">
          <span class="circulo ${item.tipo}"></span>
          <p>${item.descricao}</p>
        </div>
        <div class="movimentacao-item-info-valor">
          <span class="data-movimentacao">${formatarData(item.data)}</span>
          <span class="valor-movimentacao ${item.tipo}">${sinal} ${item.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
        </div>
      </div>
      <div class="movimentacao-item-acoes">
        <button class="btn-editar-movimentacao" data-id="${item.id}" title="Editar">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="btn-excluir-movimentacao" data-id="${item.id}" title="Excluir">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `;
  });
  container.innerHTML = html; // Adiciona o HTML gerado à lista de movimentações
}

function obterListaFiltrada(filtro) {
  switch (filtro) {
    case "todas":
      return movimentacao;
    case "receita":
      return movimentacao.filter((item) => item.tipo === "receita");
      break;
    case "despesa":
      return movimentacao.filter((item) => item.tipo === "despesa");
      break;
    default:
      return [];
  }
}

btnFiltro.forEach((btn) => {
  btn.addEventListener("click", () => {
    btnFiltro.forEach((b) => b.classList.remove("active")); // Remove a classe "active" de todos os botões
    btn.classList.add("active"); // Adiciona a classe "active" ao botão clicado

    renderizarLista(obterListaFiltrada(btn.dataset.filtro));
  });
});

container.addEventListener("click", (e) => {
  const btnExcluir = e.target.closest(".btn-excluir-movimentacao");
  const btnEditar = e.target.closest(".btn-editar-movimentacao");
  const btnFiltroAtivo = document.querySelector("#botoes-filtro button.active");

  if (btnExcluir) {
    const idParaExcluir = parseInt(btnExcluir.dataset.id); // Obtém o ID da movimentação a ser excluída
    movimentacao = movimentacao.filter((item) => {
      return item.id !== idParaExcluir; // Filtra a lista de movimentações, removendo a que tem o ID correspondente
    });

    localStorage.setItem("movimentacao", JSON.stringify(movimentacao)); // Atualiza o localStorage com a lista de movimentações atualizada
    renderizarLista(obterListaFiltrada(btnFiltroAtivo.dataset.filtro)); // Re-renderiza a lista de movimentações
  }

  if (btnEditar) {
    const idParaEditar = parseInt(btnEditar.dataset.id); // Obtém o ID da movimentação a ser editada
    const item = movimentacao.find((item) => item.id === idParaEditar);

    if (item) {
      abrirModalEdicao(item);
    }
  }
});

// Elementos do modal de edição
const modalOverlay = document.getElementById("modal-editar-overlay");
const formEditar = document.getElementById("form-editar-movimentacao");
const inputEditarValor = document.getElementById("editar-valor");
const inputEditarData = document.getElementById("editar-data");
const inputEditarDescricao = document.getElementById("editar-descricao");
const btnCancelarEditar = document.getElementById("btn-cancelar-editar");
let idEmEdicao = null; // Guarda o ID da movimentação que está sendo editada

function abrirModalEdicao(item) {
  idEmEdicao = item.id;
  inputEditarValor.value = item.valor.toFixed(2).replace(".", ",");
  inputEditarData.value = item.data;
  inputEditarDescricao.value = item.descricao;
  modalOverlay.classList.remove("oculto");
}

function fecharModalEdicao() {
  modalOverlay.classList.add("oculto");
  idEmEdicao = null;
}

btnCancelarEditar.addEventListener("click", fecharModalEdicao);

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    fecharModalEdicao();
  }
});

formEditar.addEventListener("submit", (e) => {
  e.preventDefault();

  const btnFiltroAtivo = document.querySelector("#botoes-filtro button.active");

  const valorNumber = parseFloat(
    inputEditarValor.value.replace("R$", "").replace(",", ".").trim(),
  );
  const data = inputEditarData.value;
  const descricao = inputEditarDescricao.value;

  movimentacao = movimentacao.map((item) => {
    if (item.id === idEmEdicao) {
      return { ...item, valor: valorNumber, data: data, descricao: descricao };
    }
    return item;
  });

  localStorage.setItem("movimentacao", JSON.stringify(movimentacao)); // Atualiza o localStorage com a lista de movimentações atualizada
  renderizarLista(obterListaFiltrada(btnFiltroAtivo.dataset.filtro)); // Re-renderiza a lista de movimentações
  fecharModalEdicao();
});

renderizarLista(obterListaFiltrada(btnFiltroAtivo.dataset.filtro)); // Renderiza a lista de movimentações filtrada pelo botão ativo
