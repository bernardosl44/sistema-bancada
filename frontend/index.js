// ----------------------
// USUÁRIOS PREDEFINIDOS
// ----------------------
const usuarios = [
    { usuario: 'admin', senha: '1234', tipo: 'Professor' },
    { usuario: 'aluno', senha: '1234', tipo: 'Aluno' }
];

// ----------------------
// LOGIN
// ----------------------
const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('loginSection');
const abasNav = document.querySelector('.abas');
const conteudos = document.querySelectorAll('.conteudo-aba');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuario = document.getElementById('loginUsuario').value;
    const senha = document.getElementById('loginSenha').value;

    const encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);
    if (encontrado) {
        loginSection.classList.add('hidden');
        abasNav.classList.remove('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
    } else {
        alert('Usuário ou senha incorretos!');
    }
});

// ----------------------
// ABAS
// ----------------------
const abas = document.querySelectorAll('.aba');
abas.forEach(botao => {
    botao.addEventListener('click', () => {
        abas.forEach(b => b.classList.remove('ativa'));
        conteudos.forEach(c => c.classList.add('hidden'));

        botao.classList.add('ativa');
        document.getElementById(botao.dataset.target).classList.remove('hidden');
    });
});

// ----------------------
// CADASTRO
// ----------------------
const cadastroForm = document.getElementById('cadastroForm');
const cadastroList = document.getElementById('cadastroList');

cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('cadNome').value;
    const sobrenome = document.getElementById('cadSobrenome').value;
    const nascimento = document.getElementById('cadNascimento').value;
    const tipo = document.getElementById('cadTipo').value;
    const usuario = document.getElementById('cadUsuario').value;
    const senha = document.getElementById('cadSenha').value;

    // Adiciona novo usuário à lista de usuários
    usuarios.push({ usuario, senha, tipo });

    // Adiciona à lista visual de cadastros
    const li = document.createElement('li');
    li.textContent = `${nome} ${sobrenome} | ${tipo} | Usuário: ${usuario}`;
    cadastroList.appendChild(li);

    cadastroForm.reset();
});

// ----------------------
// PEDIDOS
// ----------------------
const pedidosForm = document.getElementById('pedidosForm');
const pedidosList = document.getElementById('pedidosList');

pedidosForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('pedidoNome').value;
    const base = document.getElementById('pedidoBase').value;
    const frente = document.getElementById('pedidoFrente').value;
    const esquerda = document.getElementById('pedidoEsquerda').value;
    const direita = document.getElementById('pedidoDireita').value;

    const li = document.createElement('li');
    li.textContent = `Pedido: ${nome} | Base: ${base} | Frente: ${frente} | Esquerda: ${esquerda} | Direita: ${direita}`;
    pedidosList.appendChild(li);

    pedidosForm.reset();
});

// ----------------------
// DASHBOARD - BOLINHAS E AMBIENTE
// ----------------------
function gerarCorBolinha() {
    const cores = ['green', 'red', 'blue', 'grey']; // estoque aleatório
    return cores[Math.floor(Math.random() * cores.length)];
}

function atualizarBolinha() {
    const bolinhas = document.querySelectorAll('.bola');
    bolinhas.forEach(b => b.style.background = gerarCorBolinha());
}

function atualizarAmbiente() {
    const ambientes = document.querySelectorAll('.ambiente');
    ambientes.forEach(a => {
        const temp = (20 + Math.floor(Math.random() * 10)) + '°C';
        const umid = (30 + Math.floor(Math.random() * 40)) + '%';
        a.textContent = `Temperatura: ${temp} | Umidade: ${umid}`;
    });
}

// Atualiza a cada 2 segundos
setInterval(() => {
    atualizarBolinha();
    atualizarAmbiente();
}, 2000);

// Inicializa bolinhas e ambiente
atualizarBolinha();
atualizarAmbiente();

