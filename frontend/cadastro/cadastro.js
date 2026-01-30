let usuarios = [];

const cadastroCompletoForm = document.getElementById('cadastroCompletoForm');
const cadastroList = document.getElementById('cadastroList');
const buscarUsuario = document.getElementById('buscarUsuario');
const btnMostrarCadastros = document.getElementById('btnMostrarCadastros');

let cadastrosVisiveis = false;

// Renderiza usuários na lista
function renderUsuarios(filter='') {
    cadastroList.innerHTML = '';
    const filtrados = usuarios.filter(u => u.nome.toLowerCase().includes(filter.toLowerCase()));
    if(filtrados.length === 0) {
        const li = document.createElement('li');
        li.innerText = 'Sem cadastros';
        cadastroList.appendChild(li);
        return;
    }
    filtrados.forEach((u, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
            Usuário: ${u.usuario} <br> 
            Senha: ${u.senha} <br> 
            Nome: ${u.nome} ${u.sobrenome} <br> 
            Nascimento: ${u.nascimento} <br> 
            Email: ${u.email} 
            <button class="editar">Editar</button> 
            <button class="excluir">Excluir</button>
        `;
        // Botões só comunicam
        li.querySelector('.editar').onclick = () => {
            fetch('http://localhost:1881/cadastros/editar', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(u)
            }).then(res => {
                if(res.ok) alert('Usuário enviado para Node-RED (editar)');
            });
        };
        li.querySelector('.excluir').onclick = () => {
            fetch('http://localhost:1881/cadastros/excluir', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(u)
            }).then(res => {
                if(res.ok) alert('Usuário enviado para Node-RED (excluir)');
            });
        };
        cadastroList.appendChild(li);
    });
}

// Mostrar / esconder lista
btnMostrarCadastros.onclick = () => {
    cadastrosVisiveis = !cadastrosVisiveis;
    cadastroList.style.display = cadastrosVisiveis ? 'block' : 'none';
    buscarUsuario.style.display = cadastrosVisiveis ? 'block' : 'none';
    if(cadastrosVisiveis) renderUsuarios();
};

// Filtro ao digitar
buscarUsuario.oninput = () => {
    renderUsuarios(buscarUsuario.value);
};

// CADASTRO NA ABA
cadastroCompletoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuarioData = {
        nome: document.getElementById('cadNomeCompleto').value,
        sobrenome: document.getElementById('cadSobrenomeCompleto').value,
        nascimento: document.getElementById('cadNascimentoCompleto').value,
        usuario: document.getElementById('cadUsuarioCompleto').value,
        senha: document.getElementById('cadSenhaCompleto').value,
        email: document.getElementById('cadEmailCompleto').value
    };

    // Adiciona localmente se não existir
    if(!usuarios.find(u => u.usuario === usuarioData.usuario)) {
        usuarios.push(usuarioData);
    }

    renderUsuarios();
    cadastroCompletoForm.reset();

    // Envia para Node-RED
    fetch('http://localhost:1881/cadastros/cadastros', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(usuarioData)
    }).then(res => {
        if(res.ok){
            console.log('Cadastro enviado para Node-RED');
        } else {
            console.error('Erro ao enviar cadastro para Node-RED');
        }
    }).catch(err => console.error('Erro de conexão:', err));
});
