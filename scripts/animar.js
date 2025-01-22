// Definir o botão de clique e o menu que aparece

const menu = document.getElementById('cabecalho-menu-responsivo')

const botao = document.getElementById('botao-menu-toggle-responsivo') 

menu.addEventListener('click', animarMenu)

function animarMenu() {
        
menu.classList.toggle('abrir')    
botao.classList.toggle('ativo')

}
