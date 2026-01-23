// ----------------------
// BANCADAS
// ----------------------
window.onload = ()=>{ polling(5); }

function polling(segundos){
    setTimeout(()=>{
        buscarDadosBancadaEstoque();
        buscarDadosBancadaProcesso();
        buscarDadosBancadaMontagem();
        buscarDadosBancadaExpedicao();
        polling(segundos);
    },segundos*1000)
}

function atualizarDadosBancada(id, data){
    const box = document.getElementById(`${id}`);
    if(box) {
        box.innerHTML = `humi: ${data.humi} <br> ai00: ${data.ai00} <br> vrms: ${data.vrms} <br> irms: ${data.irms} <br> appp: ${data.appp} <br> actp: ${data.actp}`;
    }
}

function buscarDadosBancadaEstoque(){
    fetch('http://10.77.241.113:1880/api/smartsense/estoque')
    .then(res=>res.json())
    .then(data=>atualizarDadosBancada('dados-estoque', data));
}

function buscarDadosBancadaProcesso(){
    fetch('http://10.77.241.113:1880/api/smartsense/processo')
    .then(res=>res.json())
    .then(data=>atualizarDadosBancada('dados-processo', data));
}

function buscarDadosBancadaMontagem(){
    fetch('http://10.77.241.113:1880/api/smartsense/montagem')
    .then(res=>res.json())
    .then(data=>atualizarDadosBancada('dados-montagem', data));
}

function buscarDadosBancadaExpedicao(){
    fetch('http://10.77.241.113:1880/api/smartsense/expedicao')
    .then(res=>res.json())
    .then(data=>atualizarDadosBancada('dados-expedicao', data));
}
