let nomeViajante = prompt("Qual o nome do(a) viajante?");
let dia = 4;
let energia = 100;
let distancia = 350;  // Distância total até a capital
let comida = 50;  // Começando com 50 pontos de comida
let dinheiro = 100;  // Começando com 100 de dinheiro
let diaExecucao = 20;
let vivo = true;
let vida = 100;  // Atributo de vida adicionado

function introduzirHistoria() {
    console.log(`Hoje é o quarto dia do mês. Você acaba de receber a terrível notícia de que seu irmão foi condenado à forca na capital. A execução está marcada para o dia ${diaExecucao}, o que significa que você tem apenas ${diaExecucao - dia} dias para percorrer os ${distancia} quilômetros até lá e tentar salvá-lo. A estrada é longa e perigosa. O que você fará agora?`);
}

function exibirStatus() {
    console.log(`========================================`);
    console.log(`Dia: ${dia}`);
    console.log(`Distância restante: ${distancia} km`);
    console.log(`Energia: ${energia}`);
    console.log(`Comida: ${comida}`);
    console.log(`Dinheiro: R$${dinheiro}`);
    console.log(`Vida: ${vida}`);  // Exibindo o status de vida
    console.log(`Dias até a execução: ${diaExecucao - dia}`);
    console.log(`========================================`);
}

function eventoBandidos() {
    let bandidos = Math.floor(Math.random() * 5) + 1; // Entre 1 e 5 bandidos
    alert(`Você encontrou ${bandidos} bandidos no caminho!`);

    let acao = prompt("Você quer lutar ou ser roubado? (lutar/roubado)");

    if (acao.toLowerCase() === "lutar") {
        combateBandidos(bandidos);
    } else {
        let dinheiroRoubado = bandidos * 10;  // Cada bandido rouba 10 dinheiros
        dinheiro = Math.max(dinheiro - dinheiroRoubado, 0);
        alert(`Você foi roubado e perdeu R$${dinheiroRoubado}.`);
    }
}

function combateBandidos(bandidos) {
    let vidaBandidos = 15;

    while (vidaBandidos > 0 && energia > 0 && vida > 0) {
        let tipoAtaque = prompt("Escolha seu ataque: normal (gasta 10 energia) ou forte (gasta 20 energia)?");
        let dano;

        if (tipoAtaque.toLowerCase() === "forte") {
            dano = Math.floor(Math.random() * 10) + 5;  // Dano entre 5 e 15
            energia -= 20;
        } else {
            dano = Math.floor(Math.random() * 5) + 3;  // Dano entre 3 e 8
            energia -= 10;
        }

        vidaBandidos -= dano;
        alert(`Você causou ${dano} de dano. A vida dos bandidos é agora ${vidaBandidos}.`);

        if (vidaBandidos > 0) {
            let danoBandidos = Math.floor(Math.random() * 5) + 5;
            vida -= danoBandidos;
            alert(`Os bandidos causaram ${danoBandidos} de dano. Sua vida é agora ${vida}.`);
        }
    }

    if (vida <= 0) {
        vivo = false;
        alert("Você morreu em combate...");
    } else {
        dinheiro += bandidos * 10;  // Ganha 10 dinheiros por bandido derrotado
        alert(`Você derrotou os bandidos e ganhou R$${bandidos * 10}!`);
    }
}

function eventoComerciante() {
    let acao = prompt("Você encontrou um comerciante. Deseja comprar 5 pontos de comida por 20 dinheiros? (sim/nao)");

    if (acao.toLowerCase() === "sim") {
        if (dinheiro >= 20) {
            comida += 5;
            dinheiro -= 20;
            alert("Você comprou 5 pontos de comida.");
        } else {
            alert("Você não tem dinheiro suficiente.");
        }
    } else {
        alert("Você decidiu não comprar nada.");
    }
}

function seguirCaminho() {
    let distanciaPercorrida = 40;  // Aumentar a distância percorrida por dia
    distancia -= distanciaPercorrida;
    energia -= 10;  // Perde energia ao seguir caminho
    alert("Você seguiu seu caminho normalmente.");
    if (Math.random() < 0.3) {
        eventoBandidos();
    }
}

function correr() {
    let distanciaPercorrida = 80;  // Aumentar a distância percorrida ao correr
    distancia -= distanciaPercorrida;
    energia -= 20;  // Perde energia ao correr
    alert("Você correu pelo caminho!");
    
    if (Math.random() < 0.5) {
        comida = Math.max(comida - 1, 0);  // Perde comida com 50% de chance
        alert("Você perdeu uma comida enquanto corria!");
    }
    
    if (Math.random() < 0.4) {
        eventoBandidos();
    }
}

function descansar() {
    energia = Math.min(energia + 20, 100);
    alert("Você descansou e recuperou energia.");
}

function comer() {
    if (comida >= 5) {
            energia = Math.min(energia + 20, 100);
            comida -= 5;
            alert("Você comeu e recuperou energia.");
        } else {
        alert("Você não tem comida suficiente para comer!");
    }
}

function pescar() {
    let peixes = Math.floor(Math.random() * 5) + 1; // Pesca de 1 a 5 peixes
    let dificuldade = 0.2 * peixes; // Aumenta a dificuldade
    if (Math.random() < dificuldade) {
        alert(`Você conseguiu pescar ${peixes} peixe(s)!`);
        comida += peixes * 5; // Cada peixe equivale a 5 pontos de comida
    } else {
        alert("Você não conseguiu pescar nada.");
    }
}

function avancarDia() {
    introduzirHistoria();  // Exibir a história apenas uma vez no início
    
    while (vivo && distancia > 0 && dia < diaExecucao) {
        exibirStatus();
        
        let acao = prompt("O que você deseja fazer? \n(1) Seguir\n(2) Correr\n(3) Descansar\n(4) Comer\n(5) Pescar");
        
        if (acao === "1" || acao.toLowerCase() === "seguir") {
            seguirCaminho();
        } else if (acao === "2" || acao.toLowerCase() === "correr") {
            correr();
        } else if (acao === "3" || acao.toLowerCase() === "descansar") {
            descansar();
        } else if (acao === "4" || acao.toLowerCase() === "comer") {
            comer();
        } else if (acao === "5" || acao.toLowerCase() === "pescar") {
            pescar();
        } else {
            alert("Ação inválida, tente novamente.");
            continue;
        }
        
        dia++;
        
        if (distancia <= 0) {
            alert("Parabéns! Você chegou à capital e salvou seu irmão!");
            break;
        }
        
        if (dia >= diaExecucao) {
            alert("Infelizmente, você não conseguiu chegar a tempo. Seu irmão foi executado...");
            vivo = false;
        }
        
        if (comida <= 0) {
            energia -= 5;  // Reduz energia se a comida acabar
            alert("Você ficou sem comida e perdeu 5 de energia!");
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
