// Variáveis iniciais
let energia = 100;
let vida = 100;
let comida = 50;
let dinheiro = 100;
let distancia = 500; // km
let dia = 4; // Dia do mês
let diaExecucao = 15; // Dia da execução
let vivo = true;

// Introdução da história
function introduzirHistoria() {
    console.log(`Hoje é o ${dia}º dia do mês. Você acaba de receber a terrível notícia de que seu irmão foi condenado à forca na capital. A execução está marcada para o dia ${diaExecucao}, o que significa que você tem apenas ${diaExecucao - dia} dias para percorrer ${distancia} quilômetros até lá e tentar salvá-lo. A estrada é longa e perigosa. O que você fará agora?`);
}

// Exibir status
function exibirStatus() {
    console.log(`Dia: ${dia}`);
    console.log(`Distância restante: ${distancia} km`);
    console.log(`Energia: ${energia}`);
    console.log(`Vida: ${vida}`);
    console.log(`Comida: ${comida}`);
    console.log(`Dinheiro: ${dinheiro}`);
    console.log(`Dias até a execução: ${diaExecucao - dia}`);
}

// Ações do jogador
function seguirCaminho() {
    let gastoEnergia = Math.floor(Math.random() * 10) + 1; // Gasta entre 1 a 10 de energia
    energia -= gastoEnergia;
    distancia -= Math.floor(Math.random() * 30) + 10; // Avança entre 10 a 39 km
    console.log(`Você seguiu o caminho e gastou ${gastoEnergia} de energia.`);
}

function correr() {
    let gastoEnergia = Math.floor(Math.random() * 20) + 10; // Gasta entre 10 a 29 de energia
    energia -= gastoEnergia;
    let chancePerderComida = Math.random();
    if (chancePerderComida < 0.5) { // 50% de chance de perder comida
        comida -= 10; // Perde 10 de comida
        console.log("Você correu e perdeu 10 de comida!");
    }
    distancia -= Math.floor(Math.random() * 50) + 20; // Avança entre 20 a 69 km
    console.log(`Você correu e gastou ${gastoEnergia} de energia.`);
}

function descansar() {
    let recuperaEnergia = Math.floor(Math.random() * 20) + 10; // Recupera entre 10 a 29 de energia
    energia = Math.min(energia + recuperaEnergia, 100);
    console.log(`Você descansou e recuperou ${recuperaEnergia} de energia.`);
}

function comer() {
    if (comida >= 10) {
        comida -= 10; // Perde 10 de comida
        energia = Math.min(energia + 20, 100); // Recupera 20 de energia
        console.log("Você comeu e recuperou 20 de energia.");
    } else {
        console.log("Você não tem comida suficiente para comer.");
    }
}

// Função para avançar os dias
function avancarDia() {
    introduzirHistoria(); // Exibir a história apenas uma vez no início

    while (vivo && distancia > 0 && dia < diaExecucao) {
        exibirStatus();

        // Reduzindo a comida a cada dia
        comida -= 5;

        let acao = prompt("O que você deseja fazer? (seguir/correr/descansar/comer)");
        
        if (acao.toLowerCase() === "seguir") {
            seguirCaminho();
        } else if (acao.toLowerCase() === "correr") {
            correr();
        } else if (acao.toLowerCase() === "descansar") {
            descansar();
        } else if (acao.toLowerCase() === "comer") {
            comer();
        } else {
            alert("Ação inválida, tente novamente.");
            continue;
        }

        dia++;
        
        // Verificações de vitória e derrota
        if (distancia <= 0) {
            alert("Parabéns! Você chegou à capital e salvou seu irmão!");
            break;
        }
        
        if (dia >= diaExecucao) {
            alert("Infelizmente, você não conseguiu chegar a tempo. Seu irmão foi executado...");
            vivo = false;
        }
        
        if (comida <= 0) {
            energia -= 10; // Reduz energia se a comida acabar
            alert("Você ficou sem comida e perdeu 10 de energia!");
        }
        
        if (energia <= 0) {
            alert("Você não tem mais energia para continuar sua jornada.");
            vivo = false;
        }
        
        if (vida <= 0) {
            alert("Você morreu de ferimentos...");
            vivo = false;
        }
    }

    if (!vivo) {
        alert("Fim de jogo. Você não conseguiu completar a jornada.");
    }
}

// Início do jogo
avancarDia();
