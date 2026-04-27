/**
 * Programa Comparador de Preços de Carros
 * Funcionalidade: Solicita marca e preço de 3 carros e identifica o mais caro e o mais barato
 * Autor: Gerado por IA
 * Data: 2024
 */

/**
 * Função principal para comparar os preços dos 3 carros
 * Identifica o carro mais caro e o mais barato
 */
function compararCarros() {
    // PASSO 1: Capturar os valores dos inputs do HTML
    const marca1 = document.getElementById('marca1').value.trim();
    const preco1 = parseFloat(document.getElementById('preco1').value);
    
    const marca2 = document.getElementById('marca2').value.trim();
    const preco2 = parseFloat(document.getElementById('preco2').value);
    
    const marca3 = document.getElementById('marca3').value.trim();
    const preco3 = parseFloat(document.getElementById('preco3').value);
    
    // PASSO 2: Validar se todos os campos foram preenchidos corretamente
    // Verifica se as marcas foram preenchidas
    if (!marca1 || !marca2 || !marca3) {
        exibirErro("Por favor, preencha a marca de todos os 3 carros!");
        return;
    }
    
    // Verifica se os preços são números válidos e positivos
    if (isNaN(preco1) || isNaN(preco2) || isNaN(preco3) || 
        preco1 <= 0 || preco2 <= 0 || preco3 <= 0) {
        exibirErro("Por favor, insira preços válidos e maiores que zero para todos os carros!");
        return;
    }
    
    // PASSO 3: Criar um array de objetos para armazenar os dados dos carros
    // Isso facilita a manipulação e comparação dos dados
    const carros = [
        { marca: marca1, preco: preco1 },
        { marca: marca2, preco: preco2 },
        { marca: marca3, preco: preco3 }
    ];
    
    // PASSO 4: Encontrar o carro mais caro
    // O método reduce() percorre o array comparando os preços e mantém o maior
    // Inicialmente, considera o primeiro elemento como o mais caro
    const carroMaisCaro = carros.reduce((maisCaro, atual) => {
        // Se o preço do carro atual for maior que o mais caro atual, substitui
        return atual.preco > maisCaro.preco ? atual : maisCaro;
    });
    
    // PASSO 5: Encontrar o carro mais barato
    // Similar ao anterior, mas compara para encontrar o menor preço
    const carroMaisBarato = carros.reduce((maisBarato, atual) => {
        // Se o preço do carro atual for menor que o mais barato atual, substitui
        return atual.preco < maisBarato.preco ? atual : maisBarato;
    });
    
    // PASSO 6: Exibir os resultados na tela
    exibirResultados(carroMaisCaro, carroMaisBarato, carros);
}

/**
 * Função para exibir mensagens de erro
 * @param {string} mensagem - Mensagem de erro a ser exibida
 */
function exibirErro(mensagem) {
    // Seleciona a div onde os resultados serão exibidos
    const resultadosDiv = document.getElementById('resultados');
    
    // Torna a div visível
    resultadosDiv.style.display = 'block';
    
    // Insere a mensagem de erro formatada
    resultadosDiv.innerHTML = `
        <div class="error">
            ⚠️ ${mensagem}
        </div>
    `;
}

/**
 * Função para exibir os resultados da comparação
 * @param {object} maisCaro - Objeto do carro mais caro (contém marca e preço)
 * @param {object} maisBarato - Objeto do carro mais barato (contém marca e preço)
 * @param {array} todosCarros - Array com todos os carros para exibir lista completa
 */
function exibirResultados(maisCaro, maisBarato, todosCarros) {
    // Seleciona a div onde os resultados serão exibidos
    const resultadosDiv = document.getElementById('resultados');
    
    /**
     * Função auxiliar para formatar valores como moeda brasileira
     * @param {number} valor - Valor numérico a ser formatado
     * @returns {string} Valor formatado como R$ X.XXX,XX
     */
    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        });
    };
    
    // PASSO 7: Construir o HTML com os resultados
    let html = `
        <h3 style="text-align: center; margin-bottom: 15px; color: #333;">
            📊 Resultado da Comparação
        </h3>
        
        <div class="result-item caro">
            🏆 CARRO MAIS CARO: ${maisCaro.marca.toUpperCase()}<br>
            💰 Preço: ${formatarMoeda(maisCaro.preco)}
        </div>
        
        <div class="result-item barato">
            💲 CARRO MAIS BARATO: ${maisBarato.marca.toUpperCase()}<br>
            💰 Preço: ${formatarMoeda(maisBarato.preco)}
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 10px;">
            <h4 style="color: #667eea; margin-bottom: 10px;">📋 Lista completa dos carros (ordenada por preço):</h4>
    `;
    
    // PASSO 8: Ordenar e exibir todos os carros do mais barato ao mais caro
    // O método sort() ordena o array baseado no preço (a - b = ordem crescente)
    const carrosOrdenados = [...todosCarros].sort((a, b) => a.preco - b.preco);
    
    // Percorre o array ordenado e adiciona cada carro à lista
    carrosOrdenados.forEach((carro, index) => {
        html += `<p style="margin: 5px 0; color: #555;">
            ${index + 1}º - ${carro.marca}: ${formatarMoeda(carro.preco)}
        </p>`;
    });
    
    html += `</div>`;
    
    // PASSO 9: Verificar e informar se houve empate nos preços
    if (maisCaro.preco === maisBarato.preco && todosCarros.length > 1) {
        html += `
            <div class="error" style="margin-top: 15px; background: #fff3cd; color: #856404;">
                ℹ️ Atenção: Todos os carros têm o mesmo preço!
            </div>
        `;
    }
    
    // PASSO 10: Inserir o HTML na página e tornar visível
    resultadosDiv.innerHTML = html;
    resultadosDiv.style.display = 'block';
    
    // PASSO 11: Rolar a página suavemente para ver os resultados
    resultadosDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * PASSO 12: Adicionar evento de teclado para melhorar a experiência do usuário
 * Permite pressionar a tecla ENTER para executar a comparação
 */
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(event) {
        // Verifica se a tecla pressionada é o ENTER
        if (event.key === 'Enter') {
            // Chama a função principal de comparação
            compararCarros();
        }
    });
});