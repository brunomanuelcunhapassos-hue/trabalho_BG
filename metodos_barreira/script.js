const perguntas = [

    {
        pista: "Sou um método contracetivo que cobre o colo do útero e sou geralmente utilizado com espermicida.",
        respostas: [
            "Preservativo masculino",
            "Diafragma",
            "Esponja contracetiva",
            "Preservativo feminino"
        ],
        correta: 1,
        explicacao: "O diafragma é uma barreira que cobre o colo do útero."
    },

    {
        pista: "Sou um método descartável, feito de espuma e que contém espermicida.",
        respostas: [
            "Capuz cervical",
            "Diafragma",
            "Esponja contracetiva",
            "Preservativo masculino"
        ],
        correta: 2,
        explicacao: "A esponja contracetiva combina uma barreira física com espermicida."
    },

    {
        pista: "Sou colocado no pénis e ajudo a reduzir o risco de muitas infeções sexualmente transmissíveis.",
        respostas: [
            "Preservativo masculino",
            "Diafragma",
            "Capuz cervical",
            "Esponja contracetiva"
        ],
        correta: 0,
        explicacao: "O preservativo masculino ajuda a prevenir a gravidez e reduz o risco de muitas IST."
    },

    {
        pista: "Sou um método reutilizável, mais pequeno do que o diafragma, que cobre diretamente o colo do útero.",
        respostas: [
            "Esponja contracetiva",
            "Preservativo feminino",
            "Capuz cervical",
            "Preservativo masculino"
        ],
        correta: 2,
        explicacao: "O capuz cervical é colocado sobre o colo do útero."
    },

    {
        pista: "Sou um método de barreira colocado no interior da vagina e posso ajudar a reduzir o risco de muitas IST.",
        respostas: [
            "Diafragma",
            "Capuz cervical",
            "Esponja contracetiva",
            "Preservativo feminino"
        ],
        correta: 3,
        explicacao: "O preservativo feminino, também chamado preservativo interno, ajuda a prevenir a gravidez e reduz o risco de muitas IST."
    }

];

let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;


// MOSTRAR PERGUNTA

function mostrarPergunta() {

    respondeu = false;

    const pergunta = perguntas[perguntaAtual];

    document.getElementById("numero-pergunta").textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    document.getElementById("pontuacao").textContent =
        `Pontuação: ${pontos}`;

    document.getElementById("pergunta-texto").textContent =
        "Quem sou eu?";

    document.getElementById("pista").textContent =
        pergunta.pista;

    document.getElementById("feedback").textContent = "";

    document.getElementById("feedback").className = "";

    document.getElementById("botao-proximo").disabled = true;

    document.getElementById("botao-proximo").textContent =
        perguntaAtual === perguntas.length - 1
        ? "Ver resultado"
        : "Próxima pergunta →";

    document.getElementById("progresso-preenchido").style.width =
        ((perguntaAtual + 1) / perguntas.length * 100) + "%";

    const respostas = document.getElementById("respostas");

    respostas.innerHTML = "";

    pergunta.respostas.forEach((resposta, indice) => {

        const botao = document.createElement("button");

        botao.className = "opcao";
        botao.textContent = resposta;

        botao.onclick = () => verificarResposta(indice);

        respostas.appendChild(botao);

    });

}


// VERIFICAR RESPOSTA

function verificarResposta(indice) {

    if (respondeu) return;

    respondeu = true;

    const pergunta = perguntas[perguntaAtual];

    const botoes = document.querySelectorAll(".opcao");

    const feedback = document.getElementById("feedback");

    if (indice === pergunta.correta) {

        pontos++;

        botoes[indice].classList.add("correta");

        feedback.textContent = "✓ Muito bem! Resposta correta! " +
            pergunta.explicacao;

        feedback.className = "feedback-correto";

    } else {

        botoes[indice].classList.add("errada");

        botoes[pergunta.correta].classList.add("correta");

        feedback.textContent = "✗ Não é essa! " +
            pergunta.explicacao;

        feedback.className = "feedback-errado";

    }

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    document.getElementById("pontuacao").textContent =
        `Pontuação: ${pontos}`;

    document.getElementById("botao-proximo").disabled = false;

}


// PASSAR À PRÓXIMA PERGUNTA

function proximaPergunta() {

    if (perguntaAtual < perguntas.length - 1) {

        perguntaAtual++;

        mostrarPergunta();

    } else {

        mostrarResultado();

    }

}


// RESULTADO FINAL

function mostrarResultado() {

    document.querySelector(".pergunta").style.display = "none";

    document.getElementById("respostas").style.display = "none";

    document.getElementById("feedback").style.display = "none";

    document.getElementById("botao-proximo").style.display = "none";

    document.getElementById("resultado-final").innerHTML = `
        <h3>Desafio concluído!</h3>

        <p>Conseguiste acertar em
        <strong>${pontos} de ${perguntas.length}</strong> perguntas.</p>

        <h2>${pontos * 20}%</h2>

        <p>${mensagemResultado()}</p>

        <button onclick="reiniciarJogo()">
            ↻ Jogar novamente
        </button>
    `;

}


// MENSAGEM CONSOANTE A PONTUAÇÃO

function mensagemResultado() {

    if (pontos === 5) {
        return "Excelente! Demonstraste conhecer muito bem os métodos contracetivos!";
    }

    if (pontos >= 3) {
        return "Muito bem! Já tens bons conhecimentos, mas ainda podes aprender mais!";
    }

    return "Continua a estudar! Revê a informação do site e tenta novamente!";
}


// REINICIAR JOGO

function reiniciarJogo() {

    perguntaAtual = 0;
    pontos = 0;

    document.querySelector(".pergunta").style.display = "block";

    document.getElementById("respostas").style.display = "grid";

    document.getElementById("feedback").style.display = "block";

    document.getElementById("botao-proximo").style.display = "block";

    document.getElementById("resultado-final").innerHTML = "";

    mostrarPergunta();

}


// INICIAR JOGO

mostrarPergunta();