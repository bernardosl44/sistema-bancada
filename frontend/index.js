// index.js

let usuarios = [];

const API = "http://localhost:1880";

const loginForm = document.getElementById('loginForm');
const loginBox = document.getElementById('loginBox');
const cadastroBox = document.getElementById('cadastroBox');
const cadastroCompletoForm = document.getElementById('cadastroCompletoForm');

const senhaInput = document.getElementById('loginSenha');
document.getElementById('toggleSenha').onclick = () => {
    senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
};

// LOGIN
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = loginUsuario.value;
    const senha = loginSenha.value;

    fetch(`${API}/autenticacao/autenticar`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
    })
    .then(resposta => {
        if(resposta.ok){
            return resposta.json();
        } else {
            throw new Error("Login inválido");
        }
    })
    .then(() => {
        window.location.href = "bancada/bancada.html";
    })
    .catch(() => {
        alert("Erro no login");
    });
});

// MOSTRAR CADASTRO
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

// CADASTRO
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

    fetch(`${API}/cadastrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioData)
    })
    .then(res => {
        if(res.ok){
            alert('Conta enviada!');
            cadastroForm.reset();
            cadastroBox.classList.add('hidden');
            loginBox.classList.remove('hidden');
        } else {
            alert('Erro ao enviar conta.');
        }
    });
});

// CADASTRO COMPLETO (mantido)
if(cadastroCompletoForm){
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

        if(!usuarios.find(u => u.usuario === usuarioData.usuario)) {
            usuarios.push(usuarioData);
        }

        fetch(`${API}/cadastrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuarioData)
        })
        .then(res => {
            if(res.ok){
                alert('Cadastro enviado!');
                cadastroCompletoForm.reset();
            }
        });
    });
}