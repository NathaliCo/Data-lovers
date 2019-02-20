
//manda llamar la función de generar pokemon random al momento de cargar la pantalla
window.onload= function init (){
    document.getElementById("pokemonOfTheDay").style.display="block";
    dataLovers.findPokemonRandom(POKEMON.pokemon, random(POKEMON.pokemon));
  };


//Bloqueo de pantallas que van a ser llamadas con el Ménu
document.getElementById("pokemonList").style.display="none";
document.getElementById("pokemonTypes").style.display="none";

//Crea un array con los nombres de los pokemones
function pokemonName (data){
  let arrayPokemonName=[];
  for (let i=0; i<data.length; i++){
    let pokemon=data[i];
    arrayPokemonName.push(pokemon.name);
  }
  console.log (arrayPokemonName);
}

//Función para generar random
let random= function (data){
  return Math.floor(((Math.random()*data.length)+1));
};



//función del botón random que llama a generar un pokemón aleatorio
function showPokemon(){
dataLovers.findPokemonRandom(POKEMON.pokemon, random(POKEMON.pokemon));
}
document.getElementById("random").addEventListener("click", showPokemon);

//Función del boton de buscar
function searchButton(){
//const filter = document.getElementById("searchPokemon");
console.log (document.getElementById("searchPokemon").value);
dataLovers.findPokemon(POKEMON.pokemon, document.getElementById("searchPokemon").value);
document.getElementById("searchPokemon").value = "";
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

/*function list(){
  const data=POKEMON.pokemon;
  console.log ("doneInit");
  document.getElementById("pokemonOfTheDay").style.display="none";
  document.getElementById("menu").style.display="block";
 for (i=0; i < data.length; i++){
  console.log ("doneFor");
  let pokemon = data[i];
  var table = document.createElement(table);
  document.getElementById("pokemonList").appendChild=table;

  document.write("<br>");
    for (let [key, value] of Object.entries(pokemon)) {
      
      if (value!==null&&value!=="N/A"&&value!=="Not in Eggs"&& value!==0){
        if (key==="name"){
        }
        if (key==="img"){
          document.write("<tr>");
          document.write("<th>");
          document.write (value);
          document.write("</th>");
          document.write("</tr>");
        }else if (key==="prev_evolution" || key==="next_evolution"){
        for (j=0; j<value.length; j++){
          document.write("<tr>");
          document.write("<th>")
          document.write (value[j].name);
          document.write("</th>")
          document.write("</tr>");
        }       
        }else{
        document.write("<tr>");
        document.write("<th>");
        document.write (value);
        document.write("</th>");
        document.write("</tr>");
        }
      }
   }
      document.write("</table>");
  }
}
*/

//dataLovers.sortData(POKEMON.pokemon, "name", "ascendente");


function menuTypes(){
  document.getElementById("pokemonTypes").style.display="block";
  document.getElementById("pokemonOfTheDay").style.display="none";
  document.getElementById("pokemonList").style.display="none";
}

document.getElementById("types").addEventListener("click", menuTypes);

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

function menuList(){
  document.getElementById("pokemonList").style.display="block";
  document.getElementById("pokemonOfTheDay").style.display="none";
  document.getElementById("pokemonTypes").style.display="none";
  
}
document.getElementById("list").addEventListener("click", menuList);

document.getElementById("filterSearch").addEventListener("click", function(){dataLovers.sortData(POKEMON.pokemon, document.getElementById("listFor").value, document.getElementById("listOrder").value)});

function tabla(data){
  for (i=0; i<data.length; i++){
  var parrafo = document.getElementById("results");
  var tabla = document.createElement("tabla");
  var tblBody = document.createElement("tbody");
    for (j=0; j<=2; j++){
  var hilera= document.createElement("tr");
      for (k=0; k<=1; k++){
  var celda= document.createElement("td");
  var imgPoke= document.createElement("img");
 // var pokePicture= data[i].img;
   //imgPoke.setAttribute("src", pokePicture);
   var textoCelda= document.createTextNode(data[i].name);
      }
    }
  celda.appendChild(textoCelda);
  hilera.appendChild(celda);
  tblBody.appendChild(hilera);
  tabla.appendChild(tblBody);
  parrafo.appendChild(tabla);
  parrafo.appendChild(document.createElement("br"));
  }
  
}
tabla(POKEMON.pokemon);