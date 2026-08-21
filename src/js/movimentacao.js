const movimentacao = JSON.parse(localStorage.getItem("movimentacao") || "[]"); // Recupera a lista de movimentações do localStorage, ou cria uma nova lista vazia se não existir
const container = document.getElementById("movimentacao-lista"); // Seleciona a lista de movimentacoes

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
    </div>
  `;
  });
  container.innerHTML = html; // Adiciona o HTML gerado à lista de movimentações
}

renderizarLista(movimentacao); // Chama a função para renderizar a lista de movimentações
