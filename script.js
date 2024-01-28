const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3030/artists`;
    
    // Fazendo a solicitação à API para recuperar todos os artistas
    fetch(url)
        .then(response => {
            // Verifica se a resposta foi bem-sucedida (status 200)
            if (!response.ok) {
                throw new Error('Erro ao buscar dados da API');
            }
            // Retorna os dados em formato JSON
            return response.json();
        })
        .then(data => {
            // Manipula os dados retornados
            // Filtra os artistas cujo nome corresponde ao termo de busca (insensível a maiúsculas/minúsculas)
            const filteredArtists = data.filter(artist => artist.name.toLowerCase().includes(searchTerm.toLowerCase()));
            // Faça o que desejar com os artistas filtrados
            console.log(filteredArtists);
            // Ou retornar para usar em outro lugar
            return filteredArtists;
        })
        .then(result => displayResults(result))
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}


function displayResults(result) {
    resultPlaylist.classList.add("hidden")
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value;
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        resultPlaylist.classList.remove('hidden');
        return
    }

    requestApi(searchTerm);
})