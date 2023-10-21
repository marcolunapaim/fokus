const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarImg = document.querySelector('#start-pause img')
const tempoNaTela = document.querySelector('#timer')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sounds/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sounds/play.wav');
const audioPausa = new Audio('/sounds/pause.mp3');
const audioTempoFinalizado = new Audio('./sounds/beep.mp3')

musica.loop = true

let temporizador = 2400;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

startPauseBt.addEventListener('change', () => {
    somPlay.play();
})

focoBt.addEventListener('click', () => {
    temporizador = 2400
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    temporizador = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    temporizador = 600
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(temporizador <= 0){
        // audioTempoFinalizado.play()
        alert('Tempo Finalizado')
        zerar()
        return
    }
    mostrarTempo()
    temporizador -= 1;
}
startPauseBt.addEventListener('click', iniciarOuPausar )

function iniciarOuPausar(){
    if(intervaloId){
        audioPausa.play()
        zerar();
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarImg.setAttribute('src', '/imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarImg.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(temporizador * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute : '2-digit', second : '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();