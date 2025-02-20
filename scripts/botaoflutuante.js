function irAoTopo(){
    document.getElementById('cabecalho').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function () {
    let botao = document.getElementById("flutuante");
    botao.style.display = "none"; // Garante que inicie oculto
});

document.addEventListener("scroll", function () {
    let primeiraSecao = document.getElementById("conteudo-principal");
    let conteudoSecundario = document.getElementById("conteudo-secundario");
    let conteudoSecundarioMobile = document.getElementById("conteudo-secundario-mobile");
    let botao = document.getElementById("flutuante");

    let primeiraSecaoBottom = primeiraSecao.getBoundingClientRect().bottom;
    let conteudoSecundarioTop = conteudoSecundario.getBoundingClientRect().top;
    let conteudoSecundarioMobileTop = conteudoSecundarioMobile.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;

    // Se a primeira seção ainda estiver visível, esconde o botão
    if (primeiraSecaoBottom > 0) {
        botao.style.display = "none";
    } 
    // Quando o "conteúdo secundário" aparece na tela, mostra o botão
    else if (conteudoSecundarioTop < windowHeight || conteudoSecundarioMobileTop < windowHeight) {
        botao.style.display = "block";
    }
});
