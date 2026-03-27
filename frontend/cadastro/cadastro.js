// cadastro.js

let usuarios = [];

const API = "http://localhost:1880";

const cadastroCompletoForm = document.getElementById('cadastroCompletoForm');
const corpoTabelaCadastros = document.getElementById('corpoTabelaCadastros');
const btnAbrirTabela = document.getElementById('btnAbrirTabela');
const tabelaCadastros = document.getElementById('tabelaCadastros');

function renderTabela() {
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
            <td>
                <button class="btn-acao btn-vermelho editar">Editar</button>
                <button class="btn-acao btn-vermelho excluir">Excluir</button>
            </td>
        `;

        const btnEditar = tr.querySelector('.editar');
        const btnExcluir = tr.querySelector('.excluir');

        // Envia o objeto completo para o Node-RED
        btnEditar.addEventListener('click', () => {
            fetch(`${API}/cadastros/editar`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(u)
            })
            .then(res => {
                if(res.ok) alert('Edição enviada para Node-RED.');
                else alert('Erro ao comunicar edição.');
            })
            .catch(() => alert('Erro de comunicação com Node-RED.'));
        });

        btnExcluir.addEventListener('click', () => {
            fetch(`${API}/cadastros/excluir`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(u)
            })
            .then(res => {
                if(res.ok){
                    // Remove da tabela local
                    usuarios = usuarios.filter(user => user.usuario !== u.usuario);
                    renderTabela();
                    alert('Exclusão enviada para Node-RED.');
                } else {
                    alert('Erro ao comunicar exclusão.');
                }
            })
            .catch(() => alert('Erro de comunicação com Node-RED.'));
        });

        corpoTabelaCadastros.appendChild(tr);
    });
}

btnAbrirTabela.addEventListener('click', () => {
    // alterna a exibição da tabela
    tabelaCadastros.style.display =
        tabelaCadastros.style.display === "none" ? "table" : "none";

    if(tabelaCadastros.style.display === "table"){
        fetch(`${API}/usuarios`)
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
            renderTabela();
        })
        .catch(() => alert('Erro ao buscar usuários no Node-RED.'));
    }
});

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

    fetch(`${API}/cadastrar`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(usuarioData)
    })
    .then(res => {
        if(res.ok){
            alert('Cadastro enviado com sucesso!');
            cadastroCompletoForm.reset();
        } else {
            alert('Erro ao enviar');
        }
    })
    .catch(() => alert('Erro de comunicação com Node-RED.'));
});