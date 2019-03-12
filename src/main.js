fetch('https://raw.githubusercontent.com/Nathalis/curricula-js/master/projects/02-data-lovers/src/data/pokemon/pokemon.json')
    .then(res=> res.json())
    .then(newData => {

  newData=newData.pokemon;
const translateData = newData.map( item => { 
  return { Id: item.id, Número: item.num, Nombre: item.name, Imagen:item.img, Tipo: item.type , Altura : item.height, Peso: item.weight, Dulces: item.candy, Número_de_dulces: item.candy_count, Huevos: item.egg, Probabilidades_de_aparición: item.spawn_chance,  Hora_más_activa_de_apariciones: item.spawn_time, Próxima_evolución: item.next_evolution, Evolución_anterior: item.prev_evolution}; 
});

//Función para generar random
 let random= function (data){
    let randomId= Math.floor(((Math.random()*data.length)+1));
    return randomId;
};

function pokemonFacts(){
  let data= FACTS.facts;
  let random = Math.floor(((Math.random()*data.length)));
  document.getElementById("pokemonFacts").innerHTML=data[random];
}

function init (){
  document.getElementById("caracteristics").innerHTML = "";
  document.getElementById("graphics").style.display="none";
  document.getElementById("pokemonOfTheDay").style.display="block";
  let pokemon = dataLovers.findPokemonRandom(translateData, random(translateData));
  printFirstData(pokemon);
  pokemonFacts();

}
//manda llamar la función de generar pokemon random al momento de cargar la pantalla
window.onload= init ();

//Bloqueo de pantallas que van a ser llamadas con el Ménu
document.getElementById("pokemonList").style.display="none";
document.getElementById("statisticsList").style.display="none";
document.getElementById("usAbout").style.display="none";


//Función del boton de buscar
function searchButton(){  
  document.getElementById("caracteristics").innerHTML= "";
    let pokemon=dataLovers.findPokemon(translateData, document.getElementById("searchPokemon").value);
    printFirstData(pokemon);
    document.getElementById("searchPokemon").value = "";
    document.getElementById("pokemonOfTheDay").style.display="block";
    document.getElementById("pokemonList").style.display="none";
    document.getElementById("statisticsList").style.display="none";
    document.getElementById("usAbout").style.display="none";
   
    document.getElementById("results").style.display="none";
    document.getElementById("graphics").style.display="none";
}
document.getElementById("search").addEventListener("click", searchButton);

function printFirstData (pokemon){
 
  colorChange= document.getElementById("name");
  colorChange.setAttribute("class", pokemon.Tipo[0]);
   document.getElementById("name").innerHTML = pokemon.Nombre;
   document.getElementById("picture").src = pokemon.Imagen;
   let text;
   const caracteristics= document.getElementById("caracteristics");
   for (let property in pokemon){
    let span = document.createElement("span");
      if (property==="Imagen" || property==="Nombre" || typeof pokemon[property] == "undefined"){
        console.log("done");
       }else if (property === "Próxima_evolución" || property === "Evolución_anterior" ) {
         text = document.createTextNode ( property + ": " + pokemon[property][0].name );
         span.appendChild(text);
    caracteristics.appendChild(span);
    caracteristics.innerHTML+= "<br>";
      }else{
      text= document.createTextNode (property + ": " + pokemon[property] ); 
      span.appendChild(text);
    caracteristics.appendChild(span);
    caracteristics.innerHTML+= "<br>";
      }
}   
}

document.getElementById("random").addEventListener("click", init);

//función para buscar e imprimir en pantalla los pokemon por tipo
let typeButtons= Array.from(document.getElementsByClassName("typeButton"));

for(let i = 0; i < typeButtons.length ; i++) {
  typeButtons[i].addEventListener("click",()=>{
        let filterProperties=dataLovers.filterType(newData, typeButtons[i].getAttribute('id'));
        table(filterProperties); 
     });
}
 
//Función para mostrar la pantalla con la lista completa de pokemones
function menuList(){
 
  document.getElementById("usAbout").style.display="none";
  document.getElementById("results").innerHTML=" ";
  document.getElementById("pokemonList").style.display="block";
  document.getElementById("pokemonOfTheDay").style.display="none";
  document.getElementById("statisticsList").style.display="none";
  table(newData);
  
}
document.getElementById("list").addEventListener("click", menuList);

function printOrderList(){
  let pokemonOrder= dataLovers.sortData(newData, document.getElementById("listFor").value, document.getElementById("listOrder").value);
  table(pokemonOrder);
}

document.getElementById("filterSearch").addEventListener("click",  printOrderList);

//Función para imprimir la lista de pokemones total y por tipo
function table(data){
  document.getElementById("graphics").style.display="none";
  const paragraph= document.getElementById("results");
  paragraph.innerHTML=" ";
    for (let i=0; i<data.length; i++){
      const span=document.createElement("span");
      const label = document.createElement("label");
      const image = document.createElement ("img");
      const num =document.createTextNode (data[i].num+ " ");
      const name = document.createTextNode (data[i].name);
      label.appendChild(num);
      label.appendChild(name);
      span.appendChild(label);
      paragraph.appendChild(span);
      image.src= data[i].img;
      span.appendChild(image);
      paragraph.appendChild(span);
    }
  }
//Función para ir a la pantalla de inicio  
function start() {
  location.reload();
}

document.getElementById("start").addEventListener("click", start);

//función para activar la pantalla de estadísticas
function statistics(){
  document.getElementById("graphics").innerHTML=" ";
  document.getElementById("graphics").style.display="block";
  document.getElementById("results").innerHTML=" ";
  document.getElementById("usAbout").style.display="none";
  document.getElementById("pokemonList").style.display="none";
  document.getElementById("pokemonOfTheDay").style.display="none";
  document.getElementById("statisticsList").style.display="none";
  document.getElementById("statisticsList").style.display="block";
}
document.getElementById("statistics").addEventListener("click", statistics);

function statisticSearch(){
  const data = dataLovers.filterType(newData, document.getElementById("statisticsOptions").value);
  let total= dataLovers.computeStats(data, "spawn_chance");
  document.getElementById("results").innerHTML=total;
}
document.getElementById("statisticSearch").addEventListener("click", statisticSearch);

function aboutUs(){
  document.getElementById("graphics").style.display="none";
  document.getElementById("searchPokemon").value = "";
  document.getElementById("pokemonOfTheDay").style.display="none";
  document.getElementById("pokemonList").style.display="none";
  document.getElementById("statisticsList").style.display="none";
  document.getElementById("results").innerHTML=" ";
  document.getElementById("usAbout").style.display="block";
}

document.getElementById("aboutUs").addEventListener("click", aboutUs);

 /*function graphicData (){
  let total;
  for (let i=0; i<typeButtons.length; i++){
      total=0;
      let condition = typeButtons[i].getAttribute('id');
      console.log(condition);
      let filterProperties= dataLovers.filterType (newData, condition);
      console.log (filterProperties);
      filterProperties.forEach(pokemon =>(total+= (pokemon.spawn_chance)));
      total=total/filterProperties.length;
      console.log (total);
  }
  console.log (total);
}

document.getElementById("graphics").addEventListener("click", graphicData);*/

function graphicDatas(condition) {
  let total=0;
      let filterProperties= dataLovers.filterType (newData, condition);
      filterProperties.forEach(pokemon =>(total+= (pokemon.spawn_chance)));
      total=total/filterProperties.length;
      return total;
}


function graficas(){
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
drawStuff();
}
function drawChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['Fuego', graphicDatas("Fire")],
    ['Agua', graphicDatas("Water")],
    ['Veneno', graphicDatas("Poison")],
    ['Normal', graphicDatas("Normal")],
    ['Planta', graphicDatas("Grass")],
    ['Electrico', graphicDatas("Electric")],
    ['Hielo', graphicDatas("Ice")],
    ['Luchador', graphicDatas("Fighting")],
    ['Tierra', graphicDatas("Ground")],
    ['Volador', graphicDatas("Flying")],
    ['Psíquico', graphicDatas("Psychic")],
    ['Insecto', graphicDatas("Bug")],
    ['Roca', graphicDatas("Rock")],
    ['Dragón', graphicDatas("Dragon")],
    ['Fantasma', graphicDatas("Ghost")],
  ]);

  const options = {'title':'Porcentaje de probabilidades de aparición de pokemon por tipo',
  width: '100%',
      height: '500px'
};
  const chart = new google.visualization.PieChart(document.getElementById('graphics'));
  chart.draw(data, options);
}

document.getElementById("charts").addEventListener("click", graficas);
document.getElementById("searchPokemon").addEventListener('keypress', logKey);

function logKey(e) {
  key = (document.all) ? e.keyCode : e.which;
  if (key==13) searchButton();
}


});


  const FACTS= {
    "facts": ["La palabra pokémon es la contracción de pocket monsters, o sea, monstruos de bolsillo en inglés. En español puede llevar acento y variar en plural, según la RAE (los pokémones, pero también es correcto dejarlo en los pokémon), y lo mismo sucede con cada especie (como los pikachus, los bulbasaurs, etc.). Pero en inglés y japonés no cambia ni la palabra pokémon ni cada tipo.","El concepto de la franquicia está basado en la afición a coleccionar insectos que de pequeño tenía el productor ejecutivo del universo Pokémon, Satoshi Tajiri. Así, incluye videojuegos (el producto original) pero también una serie animada, películas, un juego de cartas, juegos de mesa, un parque de atracciones itinerante y hasta un musical.",
    "El chaval protagonista de la serie, Ash Ketchum, en Japón se llama Satoshi, como su creador. Ash era una de las opciones para el nombre del protagonista de los primeros juegos y el apellido es una contracción sonora del lema de la saga en inglés: Gotta catch 'em all! (¡Hazte con todos!). No es el único cuyo nombre cambió al abandonar Japón: sus compañeros eran Misty (Kasumi), Brock (Takeshi) y May (Haruka), y sus rivales Gary (Shigeru) y el Team Rocket, con Jessie (Musashi) y James (Kojiro). Estos últimos adquirieron sus nombres occidentales por el bandido estadounidense Jesse James.",
   "Aunque Pokémon cuenta con el apoyo nada menos que de El Vaticano, ha tenido problemas en otros países. Arabia Saudí prohibió la venta del juego de cartas por mostrar la estrella de David, China lo ha boicoteado para que no compita con su propia industria de la animación y en Estados Unidos varios episodios han sido censurados",
   "En origen, el rosa Clefairy iba a ser la mascota de la serie pero finalmente fue Pikachu el diseño elegido, principalmente por su color amarillo, más memorable. El nombre del pokémon más famoso deriva de dos onomatopeyas japonesas: pika, el sonido que indica chispas, y chu, el ruido que hacen los ratones.",
  "Pikachu fue nombrado segunda mejor persona del año 1999 por Time (sólo después de Ricky Martin) y el octavo personaje de ficción más rico de 2003 por Forbes, con una fortuna de 825 millones de dólares (unos 750 millones de euros al cambio actual). Es tan famoso que ha dado nombre a una proteína encargada de acelerar el envío de señales entre el ojo y el cerebro. La pikachurin fue descubierta por un grupo de científicos japoneses que eligieron el nombre porque su velocidad recordaba a la del pokémon.",
  "Pikachu no es de los monstruitos llamados 'de nivel básico´: es la primera evolución de Pichu, uno más sencillo pero que se le parece mucho. Junichi Masuda, uno de los creadores de la saga, señala que Pichu es su pokémon favorito porque tuvo un proceso de diseño muy cuidado y planeado.",
  "Bulbasaur, el primer pokemon que se elige en los videojuegos, debe su nombre a una combinación de las palabras inglesas de bulbo y dinosaurio, en referencia a los dos elementos que lo componen. Sin embargo, en Japón se llama Fushigidane, una expresión que significa '¿A que es raro?' y también 'semilla misteriosa'. Aunque está muy lejos de ser uno de los pokémon fuertes, es el favorito de muchísimos fans.",
  "Charmander y sus evoluciones Charmeleon y Charizard deben sus nombres a la mezcla entre char, que en inglés significa carbonizar, y distintos tipos de reptil (por salamandra, camaleón y lagarto, respectivamente). Es uno de los únicos pokémon del que todos los niveles son muy populares, especialmente entre la audiencia occidental. La primera carta de Charizard que se comercializó puede llegar a valer unos 2.000 euros en la actualidad porque es de las más potentes y raras.",
  "A pesar de no estar entre los personajes principales, Jigglypuff es uno de los pokemon más populares, elegido como una de las mascotas oficiales de Nintendo. Su nombre hace referencia a su apariencia gelatinosa (jiggly, temblón) y a su habilidad de inflarse (puff, inflar). En japonés se le conoce como Purin, la pronunciación nipona de pudin.",
  "Eevee es un pokémon muy raro que puede evolucionar de ocho formas diferentes, según se exponga a diferentes piedras. Su nombre es la pronunciación inglesa de las dos primeras letras de la palabra evolución. Sólo tres de sus formas superiores están disponibles en Pokémon Go: Jolteon (eléctrico), Flareon (fuego) y Vaporeon (agua), siendo éste el más fuerte del juego. Las evoluciones teóricamente son aleatorias en la app, pero ya se han desvelado dos trucos para obtener la que quieras.",
  "Los pokémon psíquicos Abra, Kadabra y Alakazam se llaman en Japón Casey, Yungerer y Foodin. Los términos nipones hacen referencia a tres famosos magos: Casey es por Edgar Cayce, un místico estadounidense del siglo XIX; Yungerer debe su nombre a Yuri Geller, un psíquico israelí descubierto como un fraude en los años 70; y Foodin es una traducción algo chapucera del apellido Houdini al japonés. Geller llegó a demandar a Nintendo por haber usado su nombre y declaró sentirse ofendido porque el diseño es 'antisemita'. La empresa ha declarado que Kadabra no volverá a salir en cartas ni en la serie hasta que se alcance un acuerdo entre ambas partes.",
  "MissingNo. (missing number, número perdido en ingles) es un fallo de los videojuegos de Pokémon que resulta en una especie desconocida. Genera errores en los gráficos y la duplicación masiva del sexto objeto encontrado por el jugador. A pesar de que puede hacer necesario reiniciar, sus efectos beneficiosos para aumentar de nivel han traído consigo la aparición de numerosas guías para conseguir que aparezca. Sin embargo, nunca llegó a España, ya que durante la traducción este error fue reparado.",
  "Uno de los grandes misterios de la saga es Cubone, un pokémon humanoide que cubre su cara con una calavera, supuestamente de su madre. Aunque evoluciona a Marowak, muchos fans piensan que está relacionado con Kangaskhan y señalan que este pokémon, al nacer, tiene un bebé en la bolsa del vientre. Existe el rumor de que MissingNo. es el pokémon que relaciona a las tres especies.",
  "Gengar y Gangar, los nombres occidental y japones del mismo pokémon, pueden derivar de la palabra alemana doppelgänger, que significa doble, apropiado para un pokémon que imita las sombras. Ambas recuerdan también a genganger, un término danés que designa fantasmas escandinavos. El kanji japonés 幻, presente en la escritura de su nombre, se puede usar para palabras relacionadas semánticamente con fantasma e ilusión. El diseñador de Pokémon Ken Sugimori considera a Gengar su pokémon favorito por su sencillo diseño.",
  "La evolución de Magikarp a Gyarados está basada en una leyenda china según la cual las carpas que se precipitaban por una mítica cascada, la Puerta del Dragón, ascendían de las aguas convertidas en dragones. Aunque Magikarp ostenta el dudoso honor de ser 'el pokémon más débil del mundo' en la serie, no tiene el ataque más bajo: Shuckle y Chansey son aún peores.",
  "Los pestilentes Koffing y Weezing, que hacen referencia a los verbos toser y jadear en inglés, iban a ser en origen Ny y La, en referencia a la contaminación de Nueva York y Los Angeles.",
  "Jynx ha dado muchos quebraderos de cabeza; en origen tenía la piel negra pero la cambiaron a violeta tras recibir críticas porque recuerda a los negros de los dibujos animados antiguos, extremadamente racistas. Los episodios en los que aparece el diseño original nunca han vuelto a ser emitidos en EEUU.",
  "¿Dónde están los pokémon legendarios en Pokémon Go? Quizá los recuerdes: Mew, Mewtwo, Articuno, Zapdos, Moltres... Los más raros entre estos bichitos aún no están disponibles para jugar, aunque eso podría cambiar dentro de nada: varios medios de EEUU especulan con que Nintendo prepara algo con estos personajes para la Comic Con de San Diego de este fin de semana. Los tres últimos de la lista son las mascotas de los líderes de los tres equipos a los que se puede uno apuntar en el juego: Sabiduría (agua), Instinto (electricidad) y Valor (fuego), respectivamente. Articuno es la contracción entre 'ártico' y el número uno; zapdos viene de zap (onomatopeya inglesa para designar el ruido de un rayo) y el número dos; y Moltres es molten (fundido) y el número tres.",
  "Mew, capaz de aprender cualquier técnica porque contiene el ADN de todos los pokémon, siempre ha sido el más difícil de capturar. El programador Shigeki Morimoto lo metió por sorpresa y en secreto en los videojuegos con la intención de que fuera una broma interna, pero después fue utilizado para aumentar la expectación y popularidad del juego. Su nombre puede derivar de 妙 (extraño o inusual en japonés), mew (el maullido de un gatito, que también emite este personaje tan parecido a un pequeño felino) o mutante (myūtanto, según la pronunciación japonesa). Mewtwo (su clon, esencialmente ´Mew dos') se parece bastante al monstruo de Frankenstein: fue creado artificialmente y guarda rencor por ello a sus creadores, la raza humana.",
  "Un pokémon no legendario pero muy difícil de ver en Pokémon Go es Ditto, capaz de convertirse en cualquier otra especie. Pero no te relajes porque este tipo de bichito sí es posible de encontrar en el juego. ¡Sigue buscando!",
  "Tras el arrollador éxito de Pokémon Go, Hollywood ha sacado la cartera para hacerse con los derechos de la franquicia y rodar una película en imagen real de los monstruitos. Tienen seria competencia, ya que la productora en cabeza no es estadounidense sino propiedad del conglomerado chino Wanda. Se trata de Legendary, responsable de la adaptación al cine de Warcraft."]
  };
  