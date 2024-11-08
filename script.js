const botao = document.getElementById("botao")
const filme = document.getElementById("filme")
const infos = document.getElementById("infos")


botao.addEventListener('click', movie);

function movie() {
    infos.innerHTML = '';
    infos.classList.add('mostrar'); // Adiciona a classe para exibir o estilo ao clicar

    const filmeNome = document.createElement('span');
    filmeNome.innerHTML = filme.value;
    filmeNome.style.cursor = 'pointer'; 

    filmeNome.addEventListener('click', fetchMovieInfo);

    infos.appendChild(filmeNome);
}


 
function fetchMovieInfo() {
    const apiKey = "1438df6de9df8e512833015edeb50d71";
    const filmeNome = filme.value;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(filmeNome)}&language=pt-BR`)
        .then(response => {
            if(!response.ok) {
                throw new Error("A solicitação não foi bem-sucedida. ");
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length === 0) {
                infos.innerHTML = "<p>Nenhum filme encontrado.</p>";
                return;
            }

            const movie = data.results[0]; 

            const filmeInfo = `
                <p>Nome: ${movie.title}</p>
                <p>Ano: ${new Date(movie.release_date).getFullYear()}</p>
                <p>Sinopse: ${movie.overview}</p>
                <p>Avaliação: ${movie.vote_average.toFixed(2)}</p>
            `;
            infos.innerHTML = filmeInfo;
        })
        .catch(error => {
            console.log("Erro: ", error);
        });
}


