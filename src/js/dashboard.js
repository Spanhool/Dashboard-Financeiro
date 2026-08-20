const movimentacao = JSON.parse(localStorage.getItem("movimentacao") || "[]"); // Recupera a lista de movimentações do localStorage, ou cria uma nova lista vazia se não existir

let totalReceitas = 0; // Inicializa a variável para armazenar o total de receitas
let totalDespesas = 0; // Inicializa a variável para armazenar o total de despesas

// DOM
const valorSaldo = document.getElementById("valor-saldo"); // Variavel para armazenar o elemento do saldo
const valorReceita = document.getElementById("valor-receita"); // Variavel para armazenar o elemento da receita
const valorDespesa = document.getElementById("valor-despesa"); // Variavel para armazenar o elemento da despesa
const listaDeMovimentacoesRecentes =
  document.getElementById("movimentacao-lista"); // Variavel para armazenar o elemento da lista de movimentações recentes

movimentacao.forEach((item) => {
  if (item.tipo === "receita") {
    totalReceitas += item.valor; // Adiciona o valor da receita ao total de receitas
  } else {
    totalDespesas += item.valor; // Adiciona o valor da despesa ao total de despesas
  }
});

let saldo = totalReceitas - totalDespesas;

valorSaldo.textContent = `${saldo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`; // Atualiza o valor do saldo no DOM
valorReceita.textContent = `${totalReceitas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`; // Atualiza o valor da receita no DOM
valorDespesa.textContent = `${totalDespesas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`; // Atualiza o valor da despesa no DOM

const recentesMovimentacoes = movimentacao.slice(-2); // Pega as duas últimas movimentações

function formatarData(data) {
  const partesData = data.split("-"); // Divide a data em partes (ano, mês, dia)
  const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`; // Formata a data para o formato dd/mm/aaaa
  return dataFormatada;
}

listaDeMovimentacoesRecentes.innerHTML = ""; // Limpa a lista de movimentações recentes

recentesMovimentacoes.forEach((item) => {
  let sinal = "";

  if (item.tipo === "receita") {
    sinal = "+";
  } else {
    sinal = "-";
  }

  listaDeMovimentacoesRecentes.innerHTML += `
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
    </div>
  `;
});
