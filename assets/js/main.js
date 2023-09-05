const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDetails = document.getElementById('modal-details');
const closeBtn = document.querySelector('.close');


const maxRecords = 151
const limit = 10
let offset = 0;

function displayPokemonDetails(pokemon) {
    modalTitle.textContent = `Detalhes de ${pokemon.name}`;
    modalDetails.innerHTML = `
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <p>Número: #${pokemon.number}</p>
        <p>Tipo(s): ${pokemon.types.join(', ')}</p>
    `;
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

pokemonList.addEventListener('click', (event) => {
    const li = event.target.closest('li');
    if (li) {
        const pokemonName = li.querySelector('.name').textContent;
        const clickedPokemon = pokemonsDetails.find((pokemon) => pokemon.name === pokemonName);
        displayPokemonDetails(clickedPokemon);
    }
});

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})