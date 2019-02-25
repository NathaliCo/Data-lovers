window.POKEMOn = {
  getAllPokemon: () => {
    return window.POKEMON.pokemon;
  }
};


window.dataLovers={
 //función para encontrar al pokemon random
 findPokemonRandom: function  (data,condition){  
  for (let i=0; i<data.length; i++){
      let pokemon =data[i];
      if (pokemon.id==condition){       
          printFirstData(pokemon);
          return pokemon.name;
      }
  }
},

//función para encontrar al pokemon con el buscador
findPokemon: function (data,condition){  
  for (let i=0; i<data.length; i++){
      let pokemon =data[i];
      if (pokemon.name==condition){       
        printAll(pokemon);
          return pokemon.id;
      }
  }
},

//Función para filtrar por tipo de pokemón
  filterType:function  (data, condition){
    const filterProperties = data.filter(pokemon => (pokemon.type[0] == condition || pokemon.type[1] == condition));
    filterProperties.forEach(elemento=>(tabla(filterProperties)));
    },

sortData: function (data, sortBy, sortOrder){
  let pokemonOrder=[];
  if (sortOrder==="ascendente"){
    pokemonOrder=data.sort(function(ob1,ob2){
    if (ob1[sortBy]>ob2[sortBy]){
      return 1;
    }else if(ob1[sortBy]< ob2[sortBy]) {
      return -1;
    }
  return 0;
  });
  pokemonOrder.forEach(elemento=>(tabla(pokemonOrder)));
  
  }else if(sortOrder==="descendente"){
    pokemonOrder=data.sort(function(ob1,ob2){
      if (ob1[sortBy]<ob2[sortBy]){
        return 1;
      }else if(ob1[sortBy]> ob2[sortBy]) {
        return -1;
      }
    return 0;
    });
    pokemonOrder.forEach(pokemon=>(tabla(pokemonOrder)));
  }
  },

computeStats: function(data, condition){
  let filterData=[];
  data.forEach(pokemon=>((filterData.push (pokemon[condition]))));
  let average = filterData.reduce(function(a, b){ return a + b; });
  average=average/filterData.length;
  document.getElementById("results").innerHTML=average;
   }
};
