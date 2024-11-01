document.getElementById('buscar').addEventListener('click', function() {
    const cidade = document.getElementById('cidade').value.trim();
    const apiKey = '12bbba59146903e13be047f761c886fe';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${apiKey}&units=metric&lang=pt`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cidade não encontrada');
            }
            return response.json();
        })
        .then(data => {
            const temperatura = data.main.temp;
            const umidade = data.main.humidity;
            const vento = data.wind.speed;
            const pais = data.sys.country; // Obter o país
            const condicaoClima = data.weather[0].main.toLowerCase(); // Condição do clima

            // Calcular a média da temperatura para as imagens
            let imagemFundo;
            let mediaTemperatura = 0;

            switch (condicaoClima) {
                case 'clear':
                    mediaTemperatura = 25; // Exemplo de temperatura média para ensolarado
                    imagemFundo = 'ensolarado.jpg';
                    break;
                case 'clouds':
                    mediaTemperatura = 20; // Exemplo de temperatura média para nublado
                    imagemFundo = 'background-app-previsao-tempo.png';
                    break;
                case 'rain':
                    mediaTemperatura = 18; // Exemplo de temperatura média para chuvoso
                    imagemFundo = 'chuvoso.jpg';
                    break;
                case 'thunderstorm':
                    mediaTemperatura = 22; // Exemplo de temperatura média para tempestade
                    imagemFundo = 'tempestade.jpg';
                    break;
                default:
                    mediaTemperatura = 20; // Temperatura padrão
                    imagemFundo = 'background-app-previsao-tempo.png'; // Padrão
            }

            // Atualiza a imagem de fundo do retângulo de resultado
            document.querySelector('.resultado').style.backgroundImage = `url(${imagemFundo})`;
            document.querySelector('.resultado').style.backgroundSize = 'cover'; // Cobre o retângulo
            document.querySelector('.resultado').style.backgroundPosition = 'center'; // Centraliza a imagem

            const resultado = `
                <h2>${data.name}, ${pais}</h2>
                <p>Temperatura: ${temperatura}°C</p>
                <p>Umidade: ${umidade}%</p>
                <p>Velocidade do Vento: ${vento} m/s</p>
            `;

            document.getElementById('resultado').innerHTML = resultado;
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = `<p>${error.message}</p>`;
        });
});
