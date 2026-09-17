const form = document.getElementById("form-despesa"); // Variavel para armazenar o formulário
const btnCancelar = document.getElementById("btn-cancelar"); // Variavel para armazenar o botão cancelar
const paginaDespesa = window.location.search;
const searchParams = new URLSearchParams(paginaDespesa);
const valorDoParametro = searchParams.get("id");
const inputValor = document.getElementById("valor");

const movimentacao = JSON.parse(localStorage.getItem("movimentacao")) || [];

const item = movimentacao.find(function (m) {
  return m.id === parseInt(valorDoParametro);
});

if (item != null) {
  let valor = document.getElementById("valor");
  valor.value = item.valor;

  let data = document.getElementById("data");
  data.value = item.data;

  let descricao = document.getElementById("descricao");
  descricao.value = item.descricao;
}

inputValor.addEventListener("input", function (valorParaAjustar) {
  let valorAjustado = parseFloat(inputValor.value.replace(/\D/g, "")) / 100;

  let valorConvertido = valorAjustado.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  inputValor.value = valorConvertido;
});

// Adiciona um evento de envio ao formulário
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let valor = document.getElementById("valor").value;
  // Remove o "R$" e substitui a vírgula por ponto, depois converte para número
  let valorNumber = parseFloat(
    valor.replace("R$", "").replace(/\./g, "").replace(",", ".").trim(),
  );

  let data = document.getElementById("data").value;

  let descricao = document.getElementById("descricao").value;

  if (item) {
    item.valor = valorNumber;
    item.data = data;
    item.descricao = descricao;

    localStorage.setItem("movimentacao", JSON.stringify(movimentacao));

    window.location.href = "index.html";
  } else {
    // Cria um objeto despesa com os valores do formulário
    const despesa = {
      id: Date.now(),
      valor: valorNumber,
      tipo: "despesa",
      data: data,
      descricao: descricao,
    };

    // Recupera a lista de movimentações do localStorage, ou cria uma nova lista vazia se não existir
    const movimentacao = JSON.parse(
      localStorage.getItem("movimentacao") || "[]",
    );
    // Adiciona a nova despesa à lista de movimentações
    movimentacao.push(despesa);
    // Salva a lista de movimentações atualizada no localStorage
    localStorage.setItem("movimentacao", JSON.stringify(movimentacao));
    // Redireciona para a página index.html
    window.location.href = "index.html";
  }
});

// Adiciona um evento de click ao botão cancelar para redirecionar para a página index.html .
btnCancelar.addEventListener("click", function () {
  window.location.href = "index.html";
});
