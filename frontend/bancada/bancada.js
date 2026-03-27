window.onload = () => { polling(); }

function polling(){
    const tempo = Math.floor(Math.random() * 2000) + 4000;

    setTimeout(() => {
        buscarDadosBancadaEstoque();
        buscarDadosBancadaProcesso();
        buscarDadosBancadaMontagem();
        buscarDadosBancadaExpedicao();
        polling();
    }, tempo);
}