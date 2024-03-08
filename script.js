const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImg = document.querySelector('.pokeImg');
const form = document.querySelector('.form');
const formControl = document.querySelector('.form-control');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (response.status === 200){
        const data = await response.json();
        return data;
    }

};

const renderPokemon = async (pokemon) => {
    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);
    if (data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        formControl.value = '';
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
    }

};

form.addEventListener('submit' , (event) => {
    event.preventDefault();
    renderPokemon(formControl.value.toLowerCase());
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})