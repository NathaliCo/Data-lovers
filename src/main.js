 //Función para generar random
 let random= function (data){
  let randomId= Math.floor(((Math.random()*data.length)+1));
  return randomId;
};



//manda llamar la función de generar pokemon random al momento de cargar la pantalla
window.onload= function init (){
    document.getElementById("pokemonOfTheDay").style.display="block";
    let pokemon= dataLovers.findPokemonRandom(POKEMON.pokemon, random(POKEMON.pokemon));
    printFirstData(pokemon);  
  };
 
//Bloqueo de pantallas que van a ser llamadas con el Ménu
document.getElementById("pokemonList").style.display="none";
document.getElementById("pokemonTypes").style.display="none";
document.getElementById("statisticsList").style.display="none";
document.getElementById("filterType").style.display="none";

//función del botón random que llama a generar un pokemón aleatorio
function showPokemon(){
let pokemon=dataLovers.findPokemonRandom(POKEMON.pokemon, random(POKEMON.pokemon));
printAll(pokemon);
}
document.getElementById("random").addEventListener("click", showPokemon);

//const buttons =document.getElementById("search");
//buttons.innerHTML= '<img src = "https://image.flaticon.com/icons/svg/164/164995.svg"/>´;
//Función del boton de buscar
function searchButton(){
let pokemon=dataLovers.findPokemon(POKEMON.pokemon, document.getElementById("searchPokemon").value);
printAll(pokemon);
document.getElementById("searchPokemon").value = "";
document.getElementById("pokemonOfTheDay").style.display="block";
document.getElementById("pokemonList").style.display="none";
document.getElementById("pokemonTypes").style.display="none";
document.getElementById("statisticsList").style.display="none";
console.log(document.getElementById("searchPokemon").value);
}
document.getElementById("search").addEventListener("click", searchButton);

//función para imprimir la información del pokemon random en la tabla
 function printFirstData (pokemon){
  document.getElementById("prev_evolution").innerHTML=" ";
  document.getElementById("next_evolution").innerHTML=" ";
  document.getElementById("name").innerHTML = pokemon.name;
  document.getElementById("picture").src = pokemon.img;
  document.getElementById("type").innerHTML = "Tipo: " + pokemon.type;
  document.getElementById("weaknesses").innerHTML = "Debilidades: " + pokemon.weaknesses;
  document.getElementById("spawn_time").innerHTML = "Tiempo: " + pokemon.spawn_time;
  //Si tiene next_evolution o prev_evolution lo imprime, si no, los deja en blanco
  if (pokemon.next_evolution!== undefined){       
       if (pokemon.next_evolution.length===1){
          document.getElementById("next_evolution").innerHTML = "Evolución: " + pokemon.next_evolution[0].name;
      }else{
          document.getElementById("next_evolution").innerHTML ="Evolución: " + pokemon.next_evolution[0].name + ", " + pokemon.next_evolution[1].name;
      }
  }
  if (pokemon.prev_evolution!== undefined){       
      if (pokemon.prev_evolution.length===1){
      document.getElementById("prev_evolution").innerHTML = "Evolución de: " + pokemon.prev_evolution[0].name;
     }else{
      document.getElementById("prev_evolution").innerHTML ="Evolución de: " + pokemon.prev_evolution[0].name + ", " + pokemon.prev_evolution[1].name;     
     }
 }
}    

function printAll(pokemon){
dataLovers.findPokemonRandom(POKEMON.pokemon, random);
  printFirstData(pokemon);
  document.getElementById("height").innerHTML= "Altura: " + pokemon.height;
  document.getElementById("weight").innerHTML="Peso: " + pokemon.weight;
  document.getElementById("candy").innerHTML = "Dulce: " + pokemon.candy;
  document.getElementById("candy_count").innerHTML ="Número de dulces: " + pokemon.candy_count;
  document.getElementById("egg").innerHTML = "Huevos: " + pokemon.egg;
  document.getElementById("spawn_chance").innerHTML = "Spawn_chance: " + pokemon.spawn_chance;
  document.getElementById("avg_spawns").innerHTML = "Avg_spawns: " + pokemon.avg_spawn;
  document.getElementById("multipliers").innerHTML = "Multipliers: " + pokemon.multipliers;
  document.getElementById("more").style.display= "none";
  document.getElementById("random").style.display= "none";
}

document.getElementById("more").addEventListener("click", printAll);

function menuTypes(){
  document.getElementById("results").innerHTML=" ";
  document.getElementById("pokemonTypes").style.display="block";
  document.getElementById("pokemonOfTheDay").style.display="none";
  document.getElementById("pokemonList").style.display="none";
  document.getElementById("statisticsList").style.display="none";
  document.getElementById("filterType").style.display="block";
}

document.getElementById("types").addEventListener("click", menuTypes);

function botonFilterType (){
  let type = document.getElementById("pokemonTypes").value;
  console.log (type);
  let filterProperties= dataLovers.filterType (POKEMON.pokemon, type);
  filterProperties.forEach(pokemon=>(table(filterProperties)));
}

document.getElementById("filterType").addEventListener("click", botonFilterType);

/*
document.getElementById("water").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Water");});
document.getElementById("poison").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Poison");});
document.getElementById("normal").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Normal");});
document.getElementById("grass").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Grass");});
document.getElementById("electric").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Electric");});
document.getElementById("ice").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Ice");});
document.getElementById("fighting").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Fighting");});
document.getElementById("fire").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Fire");});
document.getElementById("ground").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Ground");});
document.getElementById("flying").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Flying");});
document.getElementById("psychic").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Psychic");});
document.getElementById("bug").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Bug");});
document.getElementById("rock").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Rock");});
document.getElementById("dragon").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Dragon");});
document.getElementById("ghost").addEventListener("click", function(){dataLovers.filterType(POKEMON.pokemon, "Ghost");});
*/
function menuList(){
  document.getElementById("results").innerHTML=" ";
  document.getElementById("pokemonList").style.display="block";
  document.getElementById("pokemonOfTheDay").style.display="none";
  document.getElementById("pokemonTypes").style.display="none";
  document.getElementById("statisticsList").style.display="none";
  document.getElementById("filterType").style.display="none";
  table(POKEMON.pokemon);
  
}
document.getElementById("list").addEventListener("click", menuList);

function filterSearch (){
  let pokemonOrder= dataLovers.sortData(POKEMON.pokemon, document.getElementById("listFor").value, document.getElementById("listOrder").value);
  pokemonOrder.forEach(pokemon=>(table(pokemonOrder)));  
}

document.getElementById("filterSearch").addEventListener("click", filterSearch);

function table(data){
  const paragraph= document.getElementById("results");
  paragraph.innerHTML=" ";
    for (let i=0; i<data.length; i++){
      const span=document.createElement("span");
      const label = document.createElement("label");
      const image = document.createElement ("img");
      const id =document.createTextNode (data[i].id+ " ");
      const name = document.createTextNode (data[i]. name);
      label.appendChild(id);
      label.appendChild(name);
      span.appendChild(label);
      paragraph.appendChild(span);
      image.src= data[i].img;
      span.appendChild(image);
      paragraph.appendChild(span);
    }
  }
  
function start() {
  location.reload();
}

document.getElementById("start").addEventListener("click", start);
function statistics(){
  document.getElementById("results").innerHTML=" ";
  document.getElementById("pokemonList").style.display="none";
  document.getElementById("pokemonOfTheDay").style.display="none";
  document.getElementById("pokemonTypes").style.display="none";
  document.getElementById("statisticsList").style.display="none";
  document.getElementById("statisticsList").style.display="block";
  document.getElementById("filterType").style.display="none";
}
document.getElementById("statistics").addEventListener("click", statistics);
document.getElementById("statisticSearch").addEventListener("click", function(){dataLovers.computeStats(POKEMON.pokemon, document.getElementById("statisticsOptions").value);});

