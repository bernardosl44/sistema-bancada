// ----------------------
// USUÁRIOS
// ----------------------
let usuarios = [];

// ----------------------
// LOGIN
// ----------------------
const loginForm = document.getElementById('loginForm');
const loginBox = document.getElementById('loginBox');
const cadastroBox = document.getElementById('cadastroBox');
const abasNav = document.querySelector('.abas');
const conteudos = document.querySelectorAll('.conteudo-aba');

// Olhinho login
const senhaInput = document.getElementById('loginSenha');
const toggleSenhaBtn = document.getElementById('toggleSenha');
toggleSenhaBtn.addEventListener('click', () => {
    senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
});

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuarioTipo = document.getElementById('tipoLogin').value;
    const usuarioInput = document.getElementById('loginUsuario').value;
    const senhaInputVal = document.getElementById('loginSenha').value;

    const encontrado = usuarios.find(u => u.usuario === usuarioInput && u.senha === senhaInputVal && u.tipo === usuarioTipo);
    if (encontrado) {
        loginBox.classList.add('hidden');
        abasNav.classList.remove('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        renderUsuarios();
    } else {
        alert('Usuário ou senha incorretos!');
    }
});

// Botão "Cadastrar-se"
document.getElementById('btnCadastrar').addEventListener('click', () => {
    loginBox.classList.add('hidden');
    cadastroBox.classList.remove('hidden');
});

// Voltar ao login
document.getElementById('btnVoltarLogin').addEventListener('click', () => {
    cadastroBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
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
// CADASTRO INICIAL
// ----------------------
const cadastroForm = document.getElementById('cadastroForm');
const cadSenhaInput = document.getElementById('cadSenha');
const toggleSenhaCadastroBtn = document.getElementById('toggleSenhaCadastro');

toggleSenhaCadastroBtn.addEventListener('click', () => {
    cadSenhaInput.type = cadSenhaInput.type === 'password' ? 'text' : 'password';
});

cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tipo = document.getElementById('cadTipo').value;
    const usuario = document.getElementById('cadUsuario').value;
    const senha = document.getElementById('cadSenha').value;

    if (!usuario || !senha) { alert('Usuário e senha obrigatórios!'); return; }
    if (usuarios.find(u => u.usuario === usuario)) { alert('Usuário já existe!'); return; }

    usuarios.push({ nome: '', sobrenome:'', nascimento:'', tipo, usuario, senha, email:'' });
    alert('Conta criada com sucesso! Agora faça login.');
    cadastroForm.reset();
    cadastroBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
});

// ----------------------
// CADASTRO COMPLETO
// ----------------------
const cadastroCompletoForm = document.getElementById('cadastroCompletoForm');
const cadastroList = document.getElementById('cadastroList');

cadastroCompletoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('cadNome').value;
    const sobrenome = document.getElementById('cadSobrenome').value;
    const nascimento = document.getElementById('cadNascimento').value;
    const tipo = document.getElementById('cadTipoCompleto').value;
    const usuario = document.getElementById('cadUsuarioCompleto').value;
    const senha = document.getElementById('cadSenhaCompleto').value;
    const email = document.getElementById('cadEmail').value;

    if (!nome || !usuario || !senha) { alert('Nome, usuário e senha obrigatórios!'); return; }
    if (usuarios.find(u => u.usuario === usuario)) { alert('Usuário já existe!'); return; }

    usuarios.push({ nome, sobrenome, nascimento, tipo, usuario, senha, email });
    renderUsuarios();
    cadastroCompletoForm.reset();
});

function renderUsuarios() {
    cadastroList.innerHTML = '';
    usuarios.forEach(u => {
        const li = document.createElement('li');
        li.className = u.tipo.toLowerCase();
        li.innerHTML = `<span style="color:${u.tipo==='Professor'?'gold':'lightblue'}">${u.nome} ${u.sobrenome} | ${u.tipo} | Usuário: ${u.usuario} | Email: ${u.email}</span>`;
        cadastroList.appendChild(li);
    });
}

// ----------------------
// PEDIDOS
// ----------------------
const pedidosForm = document.getElementById('pedidosForm');
const pedidosList = document.getElementById('pedidosList');
const pedidos = [];

pedidosForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('pedidoNome').value;
    const base = document.getElementById('pedidoBase').value;
    const frente = document.getElementById('pedidoFrente').value;
    const esquerda = document.getElementById('pedidoEsquerda').value;
    const direita = document.getElementById('pedidoDireita').value;
    const dataCriacao = new Date();
    const status = 'Em produção';

    const pedido = { nome, base, frente, esquerda, direita, dataCriacao, status };
    pedidos.push(pedido);
    renderPedidos();
    pedidosForm.reset();
});

function renderPedidos() {
    pedidosList.innerHTML = '';
    pedidos.forEach((p,index) => {
        const li = document.createElement('li');
        li.innerHTML = `Pedido: ${p.nome} | Base: ${p.base} | Frente: ${p.frente} | Esquerda: ${p.esquerda} | Direita: ${p.direita} | Status: <span class="status">${p.status}</span> 
        <button class="editar">Editar</button> <button class="excluir">Excluir</button>`;
        li.querySelector('.excluir').addEventListener('click', () => {
            pedidos.splice(index,1);
            renderPedidos();
        });
        li.querySelector('.editar').addEventListener('click', () => {
            document.getElementById('pedidoNome').value = p.nome;
            document.getElementById('pedidoBase').value = p.base;
            document.getElementById('pedidoFrente').value = p.frente;
            document.getElementById('pedidoEsquerda').value = p.esquerda;
            document.getElementById('pedidoDireita').value = p.direita;
            pedidos.splice(index,1);
        });
        pedidosList.appendChild(li);
    });
}
