// ----------------------
// USUÁRIOS PREDEFINIDOS
// ----------------------
const usuarios = [
    { usuario: 'adm', senha: 'ADM123', tipo: 'Professor', nome: 'Administrador', email: 'adm@teste.com' },
    { usuario: 'aluno', senha: 'ALUNO123', tipo: 'Aluno', nome: 'Aluno Teste', email: 'aluno@teste.com' }
];

// ----------------------
// LOGIN
// ----------------------
const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('loginSection');
const abasNav = document.querySelector('.abas');
const conteudos = document.querySelectorAll('.conteudo-aba');

// Olhinho de senha
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
const searchInput = document.createElement('input');
searchInput.placeholder = 'Buscar por nome ou tipo...';
cadastroForm.parentNode.insertBefore(searchInput, cadastroList);

function renderUsuarios(filtro = '') {
    cadastroList.innerHTML = '';
    usuarios
        .filter(u => u.nome.toLowerCase().includes(filtro.toLowerCase()) || u.tipo.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(u => {
            const li = document.createElement('li');
            li.className = u.tipo.toLowerCase();
            li.innerHTML = `<span style="color:${u.tipo==='Professor'?'gold':'lightblue'}">${u.nome} | ${u.tipo} | Usuário: ${u.usuario} | Email: ${u.email}</span> 
            <button class="editar">Editar</button> <button class="excluir">Excluir</button>`;

            li.querySelector('.excluir').addEventListener('click', () => {
                const index = usuarios.indexOf(u);
                if (index > -1) usuarios.splice(index, 1);
                renderUsuarios(searchInput.value);
            });

            li.querySelector('.editar').addEventListener('click', () => {
                document.getElementById('cadNome').value = u.nome;
                document.getElementById('cadSobrenome').value = '';
                document.getElementById('cadNascimento').value = '';
                document.getElementById('cadTipo').value = u.tipo;
                document.getElementById('cadUsuario').value = u.usuario;
                document.getElementById('cadSenha').value = u.senha;
                document.getElementById('cadEmail').value = u.email;
                usuarios.splice(usuarios.indexOf(u),1); // Remove temporariamente para editar
            });

            cadastroList.appendChild(li);
        });
}

searchInput.addEventListener('input', () => renderUsuarios(searchInput.value));

cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('cadNome').value;
    const tipo = document.getElementById('cadTipo').value;
    const usuario = document.getElementById('cadUsuario').value;
    const senha = document.getElementById('cadSenha').value;
    const emailInput = document.getElementById('cadEmail')?.value || '';

    if (!nome || !usuario) { alert('Nome e usuário obrigatórios!'); return; }
    if (usuarios.find(u => u.usuario === usuario)) { alert('Usuário já existe!'); return; }

    usuarios.push({ nome, tipo, usuario, senha, email: emailInput });
    renderUsuarios();
    cadastroForm.reset();
});

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
    pedidos.sort((a,b) => a.dataCriacao - b.dataCriacao)
        .forEach((p,index) => {
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

// ----------------------
// DASHBOARD - BOLINHAS E AMBIENTE
// ----------------------
function gerarCorBolinha() {
    const cores = ['#2a9d8f', '#e63946', '#f4a261', '#264653']; // verde, vermelho escuro, laranja, azul escuro
    return cores[Math.floor(Math.random() * cores.length)];
}

function atualizarBolinha() {
    const bolinhas = document.querySelectorAll('.bola');
    bolinhas.forEach(b => {
        b.style.background = gerarCorBolinha();
        b.classList.add('viva');
        setTimeout(() => b.classList.remove('viva'), 1500);
    });
}

function atualizarAmbiente() {
    const ambientes = document.querySelectorAll('.ambiente');
    ambientes.forEach(a => {
        const tempNum = 20 + Math.floor(Math.random() * 10);
        const umid = 30 + Math.floor(Math.random() * 40);
        a.textContent = `Temperatura: ${tempNum}°C | Umidade: ${umid}%`;

        if (tempNum >= 28) a.className = 'ambiente quente';
        else if (tempNum >= 24) a.className = 'ambiente morno';
        else a.className = 'ambiente frio';
    });
}

// Simula polling de status dos pedidos a cada 5s
function atualizarStatusPedidos() {
    pedidos.forEach(p => {
        if (p.status !== 'Finalizado' && Math.random() < 0.3) {
            p.status = 'Finalizado';
        }
    });
    renderPedidos();
}

// Atualiza bolinhas e ambiente a cada 2s
setInterval(() => {
    atualizarBolinha();
    atualizarAmbiente();
}, 2000);

// Atualiza status dos pedidos a cada 5s
setInterval(() => {
    atualizarStatusPedidos();
}, 5000);

// Inicializa
atualizarBolinha();
atualizarAmbiente();
renderUsuarios();
renderPedidos();
