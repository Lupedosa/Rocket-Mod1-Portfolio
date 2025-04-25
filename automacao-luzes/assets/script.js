class CentralDeLuzes {
    static instancia;

    constructor() {
        if (CentralDeLuzes.instancia) {
            return CentralDeLuzes.instancia;
        }
        CentralDeLuzes.instancia = this;
    }

    static getInstance() {
        if (!CentralDeLuzes.instancia) {
            CentralDeLuzes.instancia = new CentralDeLuzes();
        }
        return CentralDeLuzes.instancia;
    }

    ligar(comodo) {
        const elemento = document.getElementById(comodo);
        if (elemento) {
            elemento.style.backgroundColor = 'yellow';
            elemento.style.color = 'black';
            elemento.innerText = `${comodo} (Ligado)`;
        }
    }

    desligar(comodo) {
        const elemento = document.getElementById(comodo);
        if (elemento) {
            elemento.style.backgroundColor = 'gray';
            elemento.style.color = 'white';
            elemento.innerText = `${comodo} (Desligado)`;
        }
    }

    estaLigada(comodo) {
        const elemento = document.getElementById(comodo);
        return elemento && elemento.style.backgroundColor === 'yellow';
    }

    alternarTodos(botoes) {
        const todosComodos = Array.from(document.querySelectorAll('.comodo')).map(div => div.id);
        const algumLigado = todosComodos.some(comodo => this.estaLigada(comodo));

        todosComodos.forEach(comodo => {
            if (algumLigado) {
                this.desligar(comodo);
            } else {
                this.ligar(comodo);
            }
        });

        botoes.forEach(botao => {
            const comodo = botao.getAttribute('data-comodo');
            botao.textContent = algumLigado ? 'Ligar' : 'Desligar';
        });

        document.getElementById('botao-todos').textContent = algumLigado ? 'Ligar Todos' : 'Desligar Todos';
    }
}

const botoes = document.querySelectorAll('button[data-comodo]');
const central = CentralDeLuzes.getInstance();

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const comodo = botao.getAttribute('data-comodo');

        if (central.estaLigada(comodo)) {
            central.desligar(comodo);
            botao.textContent = 'Ligar';
        } else {
            central.ligar(comodo);
            botao.textContent = 'Desligar';
        }
    });
});

const botaoTodos = document.getElementById('botao-todos');
botaoTodos.addEventListener('click', () => {
    central.alternarTodos(botoes);
});