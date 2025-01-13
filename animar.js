const menu = document.getElementById('menu-responsivo')

const botao = document.getElementById('botao-menu-toggle-responsivo') 

menu.addEventListener('click', animarMenu)

function animarMenu() {
        
menu.classList.toggle('abrir')    
botao.classList.toggle('ativo')

}
