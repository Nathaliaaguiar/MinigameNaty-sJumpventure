// Seleciona os elementos do jogo
const mario = document.querySelector('.mario');
const obstacle = document.querySelector('.obstacle');
const scoreDisplay = document.querySelector('.score');
const gameOverMessage = document.querySelector('.game-over-message');

// Inicializa variáveis do jogo
let isJumping = false; // Verifica se o Mario está pulando
let score = 0; // Armazena a pontuação do jogador

// Função principal que inicia o jogo
function startGame() {
    // Adiciona evento de tecla pressionada para fazer o Mario pular
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && !isJumping) {
            isJumping = true; // Define que o Mario está pulando
            mario.style.backgroundImage = "url('naty.png')"; // Altera a imagem para o Mario pulando
            jump(); // Chama a função para fazer o Mario pular
        }
    });

    // Adiciona evento de toque na tela para fazer o Mario pular em dispositivos móveis
    document.addEventListener('touchstart', function(event) {
        if (!isJumping) {
            isJumping = true; // Define que o Mario está pulando
            jump(); // Chama a função para fazer o Mario pular
        }
    });

    // Função que faz o Mario pular
    function jump() {
        let jumpHeight = 60; // Define a altura inicial do pulo do Mario
        let jumpInterval = setInterval(() => {
            if (jumpHeight >= 250) {
                clearInterval(jumpInterval); // Para o intervalo do pulo quando atinge a altura máxima
                let fallInterval = setInterval(() => {
                    if (jumpHeight <= 60) {
                        clearInterval(fallInterval); // Para o intervalo da queda quando retorna ao chão
                        isJumping = false; // Define que o Mario não está mais pulando
                        mario.style.backgroundImage = "url('marioparado.png')"; // Altera a imagem para o Mario parado
                    } else {
                        jumpHeight -= 5; // Diminui a altura do Mario (simulando a queda)
                        mario.style.bottom = jumpHeight + 'px'; // Atualiza a posição vertical do Mario
                    }
                }, 20);
            } else {
                jumpHeight += 5; // Aumenta a altura do Mario (simulando o pulo)
                mario.style.bottom = jumpHeight + 'px'; // Atualiza a posição vertical do Mario
            }
        }, 20);
    }

    // Função que move o obstáculo e verifica colisões
    function moveObstacle() {
        let obstaclePosition = window.innerWidth; // Posição inicial do obstáculo (fora da tela à direita)

        // Intervalo que move o obstáculo
        const moveObstacleInterval = setInterval(() => {
            if (obstaclePosition <= -50) {
                // Reposiciona o obstáculo fora da tela à direita com uma posição aleatória na vertical
                obstaclePosition = window.innerWidth + Math.floor(Math.random() * 500);
                score++; // Incrementa a pontuação quando o obstáculo passa pela tela
                scoreDisplay.textContent = `Pontuação: ${score}`; // Atualiza o texto da pontuação na tela
            } else {
                obstaclePosition -= 15; // Move o obstáculo para a esquerda
                obstacle.style.left = obstaclePosition + 'px'; // Atualiza a posição horizontal do obstáculo

                // Obtém as posições do Mario e do obstáculo
                const marioBottom = parseInt(window.getComputedStyle(mario).getPropertyValue('bottom'));
                const marioLeft = parseInt(window.getComputedStyle(mario).getPropertyValue('left'));
                const obstacleLeft = obstaclePosition;

                // Verifica colisões entre o Mario e o obstáculo
                if (marioBottom <= 70 && obstacleLeft <= marioLeft + 50 && obstacleLeft >= marioLeft - 50) {
                    clearInterval(moveObstacleInterval); // Para o movimento do obstáculo
                    gameOverMessage.style.display = 'block'; // Exibe a mensagem de game over
                    setTimeout(() => {
                        obstacle.style.left = '100%'; // Reposiciona o obstáculo fora da tela à direita
                        gameOverMessage.style.display = 'none'; // Esconde a mensagem de game over
                        startGame(); // Reinicia o jogo
                        score = 0; // Reinicia a pontuação
                        scoreDisplay.textContent = `Pontuação: ${score}`; // Atualiza o texto da pontuação na tela
                    }, 2000); // Aguarda 2 segundos antes de reiniciar o jogo
                }
            }
        }, 50); // Atualiza o movimento do obstáculo a cada 50 milissegundos
    }

    moveObstacle(); // Inicia o movimento do obstáculo
}

startGame(); // Inicia o jogo quando a página é carregada
