//variables
 const pokemonList = document.getElementById("pokemonList");
 const pokemonDetail = document.getElementById("pokemonDetail");
 const pokemonInfo = document.getElementById("pokemonInfo");
 const backBtn = document.getElementById("backBtn");
 const searchInput = document.getElementById("searchInput");
 const searchBtn = document.getElementById("searchBtn");
 const traer = document.getElementById("traer");

 let query ="";
 //funcion que consulta la api de pokeapi
async function fetchpokemonData(pokemonId){
    let endpoint ="https://pokeapi.co/api/v2/pokemon/"+pokemonId;
    const response = await fetch(endpoint);
    const pokemon = await response.json();
    return pokemon;   
}
// funcion que muestra la info del pokemon
function displayPokemon(pokemon){
    //console.log(pokemon) // verificando que la info llega
   const pokemonCard = document.createElement("div"); // creando el elemento
   pokemonCard.classList.add("pokemonCard") // agregando una clase
   //bloque de codigo que me busca los tipos
    let pokemonAbilities = ""
    for (let i=0;i<pokemon.abilities.length;i++){
        //console.log(pokemon.abilities[i])
        pokemonAbilities = pokemonAbilities + pokemon.abilities[i].ability.name+""
    }
    //creamos el contenido de la targeta
    pokemonCard.innerHTML = `
    <h3 class="name">${pokemon.name}</h3>
    <h2 class="idNumber">${pokemon.id}</h2>
    <img src=${pokemon.sprites.front_shiny} alt=${pokemon.name}" class="imgClass">
    <h3>tipos del pokemon</h3>
    <p>${pokemon.moves[0].move.name}</p>
    `
 // agregamos la funcionalidad de click para llamar la vista especifica
    pokemonCard.addEventListener("click",()=>{
        console.log("click" );
        showPokemonDetail(pokemon);
    })
    pokemonList.appendChild(pokemonCard);
}
function showPokemonDetail(pokemon){
    pokemonList.style.display = "none";
    pokemonDetail.style.display = "block";
    let pokemonTypes = "";
 for (i=0;i<pokemon.types.length;i++){
    // console.log(pokemon.types[i])
   pokemonTypes = pokemonTypes + pokemon.types[i].type.name +" ";
}
pokemonInfo.innerHTML = `
<h2>Detalle de pokemon</h2>
<h3 class="name">${pokemon.name}<h3>
<h2 class= "idNumber">${pokemon.id}</h2>
<img src=${pokemon.sprites.front_shiny} alt="${pokemon.name}">
<h3>Tipos del pokemon</h3>
${pokemonTypes}
`
}
backBtn.addEventListener("click",()=>{
    pokemonDetail.style.display = "none"
    pokemonList.style.display = "grid"
})
searchInput.addEventListener("input",(error)=>{
    query= error.target.value
}
)
async function searchpokemon(){
    try{
        const pokemon = await fetchpokemonData(query)
        showPokemonDetail(pokemon);
    }
    catch(error) {
        alert("este pokemon no existe")
    }
 }
 searchBtn.addEventListener("click",()=>searchpokemon());

async function loadPokedex() {
    for (let i=1;i<50;i++){
        const pokemon = await fetchpokemonData(i);
        displayPokemon(pokemon);
    }
    
}
loadPokedex()