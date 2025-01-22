// Observar (Indenficar) a seção e trocar a classe css correspondente (se não vê esconde, se vê mostra) 

const Observar = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {
            entrada.target.classList.add('mostrar')

        } else {
            entrada.target.classList.remove('mostrar')
        }

    })
})

const elementoEscondido = document.querySelectorAll('.esconder')

elementoEscondido.forEach((elemento) => Observar.observe(elemento))
