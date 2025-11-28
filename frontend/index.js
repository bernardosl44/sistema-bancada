// ABAS
const abas = document.querySelectorAll('.aba');
const conteudos = document.querySelectorAll('.conteudo-aba');

// trocar abas
abas.forEach(botao => {
    botao.addEventListener('click', () => {

        abas.forEach(b => b.classList.remove('ativa'));
        conteudos.forEach(c => c.classList.add('hidden'));

        botao.classList.add('ativa');
        document.getElementById(botao.dataset.target).classList.remove('hidden');
    });
});
