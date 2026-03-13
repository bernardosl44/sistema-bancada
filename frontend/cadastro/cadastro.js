// cadastro.js

let usuarios = [];

const cadastroCompletoForm = document.getElementById('cadastroCompletoForm');
const cadastroList = document.getElementById('cadastroList');
const buscarUsuario = document.getElementById('buscarUsuario');
const btnMostrarCadastros = document.getElementById('btnMostrarCadastros');

const corpoTabelaCadastros = document.getElementById('corpoTabelaCadastros');
const btnAbrirTabela = document.getElementById('btnAbrirTabela');
const tabelaCadastros = document.getElementById('tabelaCadastros');

let cadastrosVisiveis = false;

// Renderiza usuários na lista
function renderUsuarios(filter='') {

    if(cadastroList){
        cadastroList.innerHTML = '';

        const filtrados = usuarios.filter(u => u.nome.toLowerCase().includes(filter.toLowerCase()));

        if(filtrados.length === 0) {
            const li = document.createElement('li');
            li.innerText = 'Sem cadastros';
            cadastroList.appendChild(li);
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

            li.querySelector('.editar').onclick = () => {
                fetch('http://localhost:1880/cadastros/editar', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(u)
                }).then(res => {
                    if(res.ok) alert('Usuário enviado para Node-RED (editar)');
                });
            };

            li.querySelector('.excluir').onclick = () => {
                fetch('http://localhost:1880/cadastros/excluir', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(u)
                }).then(res => {
                    if(res.ok){
                        alert('Usuário enviado para Node-RED (excluir)');
                        usuarios = usuarios.filter(us => us.usuario !== u.usuario);
                        renderUsuarios(buscarUsuario.value);
                    }
                });
            };

            cadastroList.appendChild(li);
        });
    }

    if(corpoTabelaCadastros){

        corpoTabelaCadastros.innerHTML = '';

        usuarios.forEach(u => {

            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${u.usuario}</td>
                <td>${u.senha}</td>
                <td>${u.nome}</td>
                <td>${u.sobrenome}</td>
                <td>${u.nascimento}</td>
                <td>${u.email}</td>
            `;

            corpoTabelaCadastros.appendChild(tr);

        });

    }

}

// Mostrar / esconder lista
if(btnMostrarCadastros){
    btnMostrarCadastros.onclick = () => {

        cadastrosVisiveis = !cadastrosVisiveis;

        cadastroList.style.display = cadastrosVisiveis ? 'block' : 'none';
        buscarUsuario.style.display = cadastrosVisiveis ? 'block' : 'none';

        if(cadastrosVisiveis) renderUsuarios();
    };
}

// Filtro ao digitar
if(buscarUsuario){
    buscarUsuario.oninput = () => {
        renderUsuarios(buscarUsuario.value);
    };
}

// botão abrir tabela
if(btnAbrirTabela){
    btnAbrirTabela.onclick = () => {

        if(tabelaCadastros.style.display === "none"){
            tabelaCadastros.style.display = "table";
        }else{
            tabelaCadastros.style.display = "none";
            return;
        }

        fetch("http://localhost:1880/usuarios")
        .then(res => res.json())
        .then(data => {

            usuarios = data.map(u => ({
                usuario: u.usuario,
                senha: u.senha,
                nome: u.nome,
                sobrenome: u.sobrenome,
                nascimento: u.dt_nascimento,
                email: u.email
            }));

            renderUsuarios();

        });

    };
}

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

    if(!usuarios.find(u => u.usuario === usuarioData.usuario)) {
        usuarios.push(usuarioData);
    }

    renderUsuarios(buscarUsuario ? buscarUsuario.value : '');

    cadastroCompletoForm.reset();

    fetch('http://localhost:1880/cadastrar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(usuarioData)
    })
    .then(res => res.json().then(data => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {

        console.log(data);

        if(ok){
            alert('Cadastro enviado com sucesso!');
        } else {
            alert('Erro ao enviar conta: ' + (data.msg || 'Erro desconhecido'));
        }

    })
    .catch(err => {
        console.error('Erro de conexão:', err);
        alert('Erro de conexão com Node-RED');
    });

});