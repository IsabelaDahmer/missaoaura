const perfis = [
    {
        id: 1,
        nome: "Engenheiro de Sistemas",
        categoria: "Tecnologia",
        descricao: "Você gosta de resolver problemas, compreender sistemas e encontrar soluções para manter a missão funcionando. Seu raciocínio lógico ajuda a superar desafios tecnológicos.",
        imagem: "imagens/perfil-1.jpg"
    },
    {
        id: 2,
        nome: "Cientista Espacial",
        categoria: "Investigação",
        descricao: "Você é curioso, gosta de observar detalhes e descobrir coisas desconhecidas. Sua vontade de aprender ajuda a equipe a compreender novos planetas e fenômenos.",
        imagem: "imagens/perfil-2.jpg"
    },
    {
        id: 3,
        nome: "Explorador Planetário",
        categoria: "Exploração",
        descricao: "Você gosta de aventuras, lugares desconhecidos e situações inesperadas. Sua capacidade de adaptação é essencial para explorar novos territórios e enfrentar desafios.",
        imagem: "imagens/perfil-3.jpg"
    },
    {
        id: 4,
        nome: "Comandante Estratégico",
        categoria: "Planejamento e liderança",
        descricao: "Você gosta de organizar tarefas, analisar possibilidades e tomar decisões. Sua visão estratégica ajuda a equipe a trabalhar em conjunto e alcançar os objetivos da missão.",
        imagem: "imagens/perfil-4.jpg"
    }
];

const formulario = document.getElementById("form-missao");
const telaFormulario = document.getElementById("formulario");
const telaResultado = document.getElementById("resultado");
const nascimento = document.getElementById("nascimento");

function dataHoje() {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
}

nascimento.max = dataHoje();

function calcularIdade(data) {
    const [ano, mes, dia] = data.split("-").map(Number);
    const hoje = new Date();

    let idade = hoje.getFullYear() - ano;

    if (
        hoje.getMonth() + 1 < mes ||
        (hoje.getMonth() + 1 === mes && hoje.getDate() < dia)
    ) {
        idade--;
    }

    return idade;
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "";

    const nome = document.getElementById("nome").value.trim();
    const data = nascimento.value;

    if (nome.length < 2) {
        mensagem.textContent = "Digite seu nome corretamente.";
        return;
    }

    if (!data || data > dataHoje()) {
        mensagem.textContent = "Informe uma data de nascimento válida.";
        return;
    }

    const respostas = [];

    for (let i = 1; i <= 4; i++) {
        const resposta = formulario.querySelector(`input[name="q${i}"]:checked`);

        if (!resposta) {
            mensagem.textContent = "Responda a todas as perguntas.";
            return;
        }

        respostas.push(Number(resposta.value));
    }

    const pontos = [0, 0, 0, 0];

    respostas.forEach(resposta => {
        pontos[resposta - 1]++;
    });

    const maiorPonto = Math.max(...pontos);
    const vencedores = perfis.filter(
        (perfil, indice) => pontos[indice] === maiorPonto
    );

    let perfil;

    if (vencedores.length === 1) {
        perfil = vencedores[0];
    } else {
        perfil = {
            nome: vencedores.length === 2
                ? "Perfil Híbrido"
                : "Tripulante Multidisciplinar",
            categoria: "Perfil combinado",
            descricao: "Você combina características de diferentes áreas e pode usar várias habilidades durante a missão.",
            imagem: vencedores[0].imagem
        };
    }

    document.getElementById("saudacao").textContent = `Olá, ${nome}!`;
    document.getElementById("idade").textContent =
        `Idade: ${calcularIdade(data)} anos`;
    document.getElementById("nome-perfil").textContent = perfil.nome;
    document.getElementById("categoria-perfil").textContent = perfil.categoria;
    document.getElementById("descricao-perfil").textContent = perfil.descricao;

    const imagem = document.getElementById("imagem-perfil");
    imagem.src = perfil.imagem;
    imagem.alt = `Imagem do perfil ${perfil.nome}`;

    telaFormulario.hidden = true;
    telaResultado.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("refazer").addEventListener("click", function() {
    formulario.reset();
    document.getElementById("mensagem").textContent = "";

    telaResultado.hidden = true;
    telaFormulario.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
});