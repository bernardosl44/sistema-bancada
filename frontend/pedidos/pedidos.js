const pedidosForm = document.getElementById('pedidosForm');
const pedidosList = document.getElementById('pedidosList');
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
