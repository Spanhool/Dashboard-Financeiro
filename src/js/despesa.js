const form = document.getElementById("form-despesa"); // Variavel para armazenar o formulário
const btnCancelar = document.getElementById("btn-cancelar"); // Variavel para armazenar o botão cancelar

// Adiciona um evento de envio ao formulário
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let valor = document.getElementById("valor").value;
  // Remove o "R$" e substitui a vírgula por ponto, depois converte para número
  let valorNumber = parseFloat(
    valor.replace("R$", "").replace(",", ".").trim(),
  );

  let data = document.getElementById("data").value;

  let descricao = document.getElementById("descricao").value;

  // Cria um objeto despesa com os valores do formulário
  const despesa = {
    valor: valorNumber,
    tipo: "despesa",
    data: data,
    descricao: descricao,
  };

  // Recupera a lista de movimentações do localStorage, ou cria uma nova lista vazia se não existir
  const movimentacao = JSON.parse(localStorage.getItem("movimentacao") || "[]");
  // Adiciona a nova despesa à lista de movimentações
  movimentacao.push(despesa);
  // Salva a lista de movimentações atualizada no localStorage
  localStorage.setItem("movimentacao", JSON.stringify(movimentacao));
  // Redireciona para a página index.html
  window.location.href = "index.html";
});

// Adiciona um evento de click ao botão cancelar para redirecionar para a página index.html
btnCancelar.addEventListener("click", function () {
  window.location.href = "index.html";
});
