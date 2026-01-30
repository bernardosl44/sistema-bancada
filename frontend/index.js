let usuarios = [];

const loginForm = document.getElementById('loginForm');
const loginBox = document.getElementById('loginBox');
const cadastroBox = document.getElementById('cadastroBox');

const senhaInput = document.getElementById('loginSenha');
document.getElementById('toggleSenha').onclick = () => {
    senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
};

// LOGIN
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
    }).then(()=>{
        window.location.href = "bancada/bancada.html";
    });
});

// MOSTRAR CADASTRO INICIAL
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

// CADASTRO INICIAL - envia apenas para Node-RED
cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuarioData = {
        nome: cadNome.value,
        sobrenome: cadSobrenome.value,
        nascimento: cadNascimento.value,
        usuario: cadUsuario.value,
        senha: cadSenha.value,
        email: cadEmail.value
    };

    fetch('http://localhost:1881/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioData)
    }).then(res => {
        if(res.ok){
            alert('Conta enviada para Node-RED!');
            cadastroForm.reset();
            cadastroBox.classList.add('hidden');
            loginBox.classList.remove('hidden');
        } else {
            alert('Erro ao enviar conta.');
        }
    });
});

// ABA CADASTROS - envia dados pro Node-RED
cadastroCompletoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuarioData = {
        nome: cadNomeCompleto.value,
        sobrenome: cadSobrenomeCompleto.value,
        nascimento: cadNascimentoCompleto.value,
        usuario: cadUsuarioCompleto.value,
        senha: cadSenhaCompleto.value,
        email: cadEmailCompleto.value
    };

    // Adiciona localmente à lista de usuários
    if(!usuarios.find(u => u.usuario === cadUsuarioCompleto.value)) {
        usuarios.push(usuarioData);
    }

    renderUsuarios(); // atualiza a lista visível

    // Envia para Node-RED
    fetch("http://localhost:1881/cadastros/cadastros", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioData)
    }).then(res => {
        if(res.ok){
            alert('Cadastro enviado para Node-RED!');
            cadastroCompletoForm.reset();
        } else {
            alert('Erro ao enviar cadastro.');
        }
    });
});
