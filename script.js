const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImg = document.querySelector('.pokeImg');
const form = document.querySelector('.form');
const formControl = document.querySelector('.form-control');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const pokemonHeight = document.querySelector('.pokemonHeight');
const pokemonWeight = document.querySelector('.pokemonWeight');
const pokemonAbilities = document.querySelector('.pokemonAbilities');
const pokemonbBaseExperience = document.querySelector('.pokemonbBaseExperience');
const pokemonType = document.querySelector('.pokemonType');
const pokeInfo = document.querySelector('.pokeInfo');


let searchPokemon = 1;

function clear(){
    pokemonName.innerHTML = 'Not Found';
    pokemonNumber.innerHTML = '';
    pokemonType.innerHTML = '';
    pokemonHeight.innerHTML = '';
    pokemonWeight.innerHTML = '';
    pokemonAbilities.innerHTML = '';
    pokemonbBaseExperience.innerHTML = '';
    pokeInfo.style.backgroundColor = 'rgb(255, 255, 255)'; 
    formControl.value = '';
    pokemonImg.src = 'assets/images/image-removebg-preview (1).png';
}

const fetchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (response.status === 200){
        const data = await response.json();
        return data;
    }
}

const verifyType = async (data) => {
    const firstType = data.types[0].type.name;
    if (firstType === 'grass') {
        pokeInfo.style.backgroundColor = 'rgb(133, 255, 133)';
    } 
    else if (firstType === 'fire') {
        pokeInfo.style.backgroundColor = 'rgb(255, 99, 71)'; 
    } 
    else if (firstType === 'water') {
        pokeInfo.style.backgroundColor = 'rgb(0, 191, 255)'; 
    } 
    else if (firstType === 'bug') {
        pokeInfo.style.backgroundColor = 'rgb(159, 216, 67)'; 
    } 
    else if (firstType === 'normal') {
        pokeInfo.style.backgroundColor = 'rgb(251, 194, 161)'; 
    } 
    else if (firstType === 'poison') {
        pokeInfo.style.backgroundColor = 'rgb(87, 18, 73)'; 
    } 
    else if (firstType === 'electric') {
        pokeInfo.style.backgroundColor = 'rgb(243, 220, 40)'; 
    } 
    else if (firstType === 'ground') {
        pokeInfo.style.backgroundColor = 'rgb(218, 170, 81)'; 
    } 
    else if (firstType === 'fighting') {
        pokeInfo.style.backgroundColor = 'rgb(131, 42, 26)'; 
    } 
    else if (firstType === 'psychic') {
        pokeInfo.style.backgroundColor = 'rgb(254, 189, 215)'; 
    } 
    else if (firstType === 'rock') {
        pokeInfo.style.backgroundColor = 'rgb(201, 152, 10)'; 
    } 
    else if (firstType === 'ghost') {
        pokeInfo.style.backgroundColor = 'rgb(42, 3, 59)'; 
    }
    else if (firstType === 'fairy') {
        pokeInfo.style.backgroundColor = 'rgb(255, 127, 211)'; 
    }
    else if (firstType === 'ice') {
        pokeInfo.style.backgroundColor = 'rgb(187, 246, 255)'; 
    }
    else if (firstType === 'dragon') {
        pokeInfo.style.backgroundColor = 'rgb(42, 3, 119)'; 
    }
    else if (firstType === 'dark') {
        pokeInfo.style.backgroundColor = 'rgb(43, 24, 25)'; 
    }
    else if (firstType === 'flying') {
        pokeInfo.style.backgroundColor = 'rgb(244, 254, 253)'; 
    }
    else if (firstType === 'steel') {
        pokeInfo.style.backgroundColor = 'rgb(95, 98, 111)'; 
    }
    
}

const renderPokemon = async (pokemon) => {
    if (pokemon < 1 || pokemon > 649) {
        clear();
        return;
    }
    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'Loading...';
    let data = await fetchPokemon(pokemon);
    if (data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        let types = data.types.map(type => type.type.name).join(', ');
        pokemonType.innerHTML = types;
        pokemonHeight.innerHTML = data.height;
        pokemonWeight.innerHTML = data.weight;
        let firstAbility = data.abilities[0].ability.name;
        pokemonAbilities.innerHTML = firstAbility;
        pokemonbBaseExperience.innerHTML = data.base_experience;
        pokemonImg.src = data.sprites.versions['generation-v']['black-white']['animated']['front_default'];
        formControl.value = '';
        searchPokemon = data.id;
        await verifyType(data);
    } else {
        clear();
    }
}

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
    if (searchPokemon < 649) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
})

