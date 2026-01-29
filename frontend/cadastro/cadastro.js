let usuarios = [];

const loginForm = document.getElementById('loginForm');
const loginBox = document.getElementById('loginBox');
const cadastroBox = document.getElementById('cadastroBox');
const abasNav = document.querySelector('.abas');
const conteudos = document.querySelectorAll('.conteudo-aba');

const senhaInput = document.getElementById('loginSenha');
document.getElementById('toggleSenha').onclick = () => {
    senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
};

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuario = loginUsuario.value;
    const senha = loginSenha.value;
    

    fetch("http://localhost:1881/autenticacao/autenticar",{
        method:"POST",
        body:JSON.stringify({usuario,senha})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }
    }).then((usuario)=>{
        window.location.href = "bancada/bancada.html";
    })


});

btnCadastrar.onclick = () => {
    loginBox.classList.add('hidden');
    cadastroBox.classList.remove('hidden');
};

btnVoltarLogin.onclick = () => {
    cadastroBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
};

const cadSenha = document.getElementById('cadSenha');
document.getElementById('toggleSenhaCadastro').onclick = () => {
    cadSenha.type = cadSenha.type === 'password' ? 'text' : 'password';
};

cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (usuarios.find(u => u.usuario === cadUsuario.value))
        return alert('Usuário já existe');
    usuarios.push({
        nome: cadNome.value,
        sobrenome: cadSobrenome.value,
        nascimento: cadNascimento.value,
        usuario: cadUsuario.value,
        senha: cadSenha.value,
        email: cadEmail.value
    });
    cadastroForm.reset();
    cadastroBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
});

document.querySelectorAll('.aba').forEach(aba => {
    aba.onclick = () => {
        document.querySelectorAll('.aba').forEach(b => b.classList.remove('ativa'));
        conteudos.forEach(c => c.classList.add('hidden'));
        aba.classList.add('ativa');
        document.getElementById(aba.dataset.target).classList.remove('hidden');
    };
});

cadastroCompletoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (usuarios.find(u => u.usuario === cadUsuarioCompleto.value))
        return alert('Usuário já existe');
    usuarios.push({
        nome: cadNomeCompleto.value,
        sobrenome: cadSobrenomeCompleto.value,
        nascimento: cadNascimentoCompleto.value,
        usuario: cadUsuarioCompleto.value,
        senha: cadSenhaCompleto.value,
        email: cadEmailCompleto.value
    });
    cadastroCompletoForm.reset();
    renderUsuarios();
});

function renderUsuarios(filter='') {
    cadastroList.innerHTML = '';
    const filtrados = usuarios.filter(u => u.nome.toLowerCase().includes(filter.toLowerCase()));
    if(filtrados.length === 0) {
        const li = document.createElement('li');
        li.innerText = 'Sem cadastros';
        cadastroList.appendChild(li);
        return;
    }
    filtrados.forEach(u => {
        const li = document.createElement('li');
        li.innerHTML = `Usuário: ${u.usuario} <br> Senha: ${u.senha} <br> Nome: ${u.nome} ${u.sobrenome} <br> Nascimento: ${u.nascimento} <br> Email: ${u.email}`;
        cadastroList.appendChild(li);
    });
}

const btnMostrarCadastros = document.getElementById('btnMostrarCadastros');
const buscarUsuario = document.getElementById('buscarUsuario');
let cadastrosVisiveis = false;

btnMostrarCadastros.onclick = () => {
    cadastrosVisiveis = !cadastrosVisiveis;
    cadastroList.style.display = cadastrosVisiveis ? 'block' : 'none';
    buscarUsuario.style.display = cadastrosVisiveis ? 'block' : 'none';
    if(cadastrosVisiveis) renderUsuarios();
};

buscarUsuario.oninput = () => {
    renderUsuarios(buscarUsuario.value);
};

const pedidos = [];

pedidosForm.addEventListener('submit', (e) => {
    e.preventDefault();
    pedidos.push({
        nome: pedidoNome.value,
        base: pedidoBase.value,
        frente: pedidoFrente.value,
        esquerda: pedidoEsquerda.value,
        direita: pedidoDireita.value,
        status: 'Em produção'
    });
    pedidosForm.reset();
    renderPedidos();
});

function renderPedidos() {
    pedidosList.innerHTML = '';
    pedidos.forEach((p, i) => {
        const li = document.createElement('li');
        li.innerHTML = `${p.nome} | ${p.status} <button class="excluir">Excluir</button>`;
        li.querySelector('.excluir').onclick = () => {
            pedidos.splice(i, 1);
            renderPedidos();
        };
        pedidosList.appendChild(li);
    });
}

// BOTÃO SAIR
btnSair.onclick = () => {
    abasNav.classList.add('hidden');
    conteudos.forEach(c => c.classList.add('hidden'));
    loginBox.classList.remove('hidden');
};