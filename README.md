# Dashboard Financeiro

Aplicação web simples para controle financeiro pessoal, com registro de receitas e despesas, saldo consolidado e histórico de movimentações. Todo o armazenamento é feito no `localStorage` do navegador, sem necessidade de backend ou banco de dados.

## Funcionalidades

- **Dashboard** com saldo atual, total de receitas, total de despesas e as movimentações mais recentes.
- **Cadastro de receitas** com valor, data e descrição.
- **Cadastro de despesas** com valor, data e descrição.
- **Edição e exclusão** de movimentações já cadastradas.
- **Histórico completo** de movimentações, com filtro por tipo (todas, receitas ou despesas)

## Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)
- [Font Awesome](https://fontawesome.com/) para ícones
- `localStorage` do navegador para persistência de dados

## Estrutura do projeto

```
├── index.html            # Dashboard principal
├── receita.html           # Formulário de nova/edição de receita
├── despesa.html            # Formulário de nova/edição de despesa
├── movimentacao.html       # Histórico de movimentações
└── src/
    ├── js/
    │   ├── dashboard.js     # Lógica do dashboard
    │   ├── receita.js       # Lógica do formulário de receitas
    │   ├── despesa.js       # Lógica do formulário de despesas
    │   └── movimentacao.js  # Lógica do histórico de movimentações
    ├── style/
    │   └── style.css        # Estilos da aplicação
    └── img/
        └── logo.png
```

## Como executar

Como o projeto é composto apenas por arquivos estáticos (HTML, CSS e JS), basta abrir o arquivo `index.html` em um navegador para utilizá-lo.

Opcionalmente, é possível servir os arquivos com um servidor local, por exemplo:

```bash
npx serve .
```

## Como funciona

Cada movimentação (receita ou despesa) é salva como um objeto no `localStorage`, na chave `movimentacao`, com o formato:

```json
{
  "id": 1710000000000,
  "valor": 500,
  "tipo": "receita",
  "data": "2026-08-15",
  "descricao": "Salário"
}
```

- Ao cadastrar uma nova receita ou despesa, um novo item é adicionado à lista.
- Ao editar uma movimentação existente (via `?id=`), os dados são atualizados no item correspondente.
- O dashboard e o histórico leem essa lista para calcular saldo, totais e exibir os itens.
