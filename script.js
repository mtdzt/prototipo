// Lista de produtos fictícios
const produtos = [
  {
    id: 1,
    nome: "Alface - Un",
    preco: 5.99,
    imagem: "https://png.pngtree.com/png-clipart/20201208/original/pngtree-green-lettuce-leaves-png-image_5514210.jpg",
  },
  {
    id: 2,
    nome: "Repolho - Un",
    preco: 10.99,
    imagem: "https://media.istockphoto.com/id/673162168/pt/foto/green-cabbage-isolated-on-white.jpg?s=612x612&w=0&k=20&c=bRis3lclq8YJ7eCfNJDxoClSLo0tWeq_NtDReKbvWrE=",
  },
  {
    id: 3,
    nome: "Brócolis - Un",
    preco: 8.99,
    imagem: "https://static.escolakids.uol.com.br/2019/04/brocolis.jpg",
  },
  {
    id: 4,
    nome: "Tomate - Kg",
    preco: 10.99,
    imagem: "https://media.istockphoto.com/id/1258142863/pt/foto/tomatoes-isolate-on-white-background-tomato-half-isolated-tomatoes-side-view-whole-cut-slice.jpg?s=612x612&w=0&k=20&c=4gWvB0yEDkEsA3-MkaqVHjUww7_fa15kdJ9aXMHwbHs=",
  },
  {
    id: 5,
    nome: "Cenoura - Kg",
    preco: 16.50,
    imagem: "https://mercadoorganico.com/6443-large_default/cenoura-organica-500g-osm.jpg",
  },
]

// Variáveis globais
let carrinho = [];

// Carregar produtos na tela
function carregarProdutos(lista = produtos) {
  const container = document.getElementById('produtos');
  container.innerHTML = '';

  lista.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'produto';
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="adicionarCarrinho(${produto.id})">Adicionar ao Carrinho</button>
    `;
    container.appendChild(card);
  });
}

// Função para filtrar produtos
function filtrarProdutos() {
  const busca = document.getElementById('search').value.toLowerCase();
  const filtrados = produtos.filter(prod => prod.nome.toLowerCase().includes(busca));
  carregarProdutos(filtrados);
}

// Carrinho de compras
function adicionarCarrinho(id) {
  const produto = produtos.find(prod => prod.id === id);
  const itemCarrinho = carrinho.find(item => item.id === id);

  if (itemCarrinho) {
    itemCarrinho.quantidade++;
  } else {
    produto.quantidade = 1;
    carrinho.push(produto);
  }
  atualizarCarrinho();
  function atualizarCarrinho() {
    document.getElementById('qtd-carrinho').textContent = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  }
  
}



function atualizarCarrinho() {
  document.getElementById('qtd-carrinho').textContent = carrinho.length;
}

// Modais
function abrirLogin() {
  document.getElementById('login-modal').classList.remove('hidden');
}

function fecharLogin() {
  document.getElementById('login-modal').classList.add('hidden');
}

function abrirCadastro() {
  fecharLogin();
  document.getElementById('cadastro-modal').classList.remove('hidden');
}

function fecharCadastro() {
  document.getElementById('cadastro-modal').classList.add('hidden');
}

function abrirCarrinho() {
  atualizarItensCarrinho();
  document.getElementById('carrinho-modal').classList.remove('hidden');
}

function fecharCarrinho() {
  document.getElementById('carrinho-modal').classList.add('hidden');
}

// Atualizar itens no carrinho modal
function atualizarItensCarrinho() {
  const itens = document.getElementById('itens-carrinho');
  itens.innerHTML = '';

  if (carrinho.length === 0) {
    itens.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  carrinho.forEach((item, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade} 
        <button onclick="removerItemCarrinho(${index})">Remover</button>
        <button onclick="adicionarUnidade(${index})">+</button>
        <button onclick="removerUnidade(${index})">-</button>
      </p>
    `;
    itens.appendChild(div);
  });

  // Adicionar o total do carrinho
  const totalCarrinho = calcularTotalCarrinho();
  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<p><strong>Total: R$ ${totalCarrinho.toFixed(2)}</strong></p>`;
  itens.appendChild(totalDiv);
};




// Remover item do carrinho
function removerItemCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
  atualizarItensCarrinho();
}

// Simulação de Login/Cadastro (só frontend)
function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user && pass) {
    alert(`Bem-vindo, ${user}!`);
    fecharLogin();
  } else {
    alert("Preencha todos os campos!");
  }
}

function cadastrar() {
  const newUser = document.getElementById('novo-username').value;
  const newPass = document.getElementById('novo-password').value;

  if (newUser && newPass) {
    alert(`Usuário ${newUser} cadastrado! Agora faça login.`);
    fecharCadastro();
    abrirLogin();
  } else {
    alert("Preencha todos os campos!");
  }
}

function adicionarUnidade(index) {
  carrinho[index].quantidade++;
  atualizarCarrinho();
  atualizarItensCarrinho();
}

function removerUnidade(index) {
  if (carrinho[index].quantidade > 1) {
    carrinho[index].quantidade--;
    atualizarCarrinho();
    atualizarItensCarrinho();
  } else {
    alert("Você não pode remover mais unidades deste produto.");
  }
}

function calcularTotalCarrinho() {
  return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

// Iniciar
carregarProdutos();
