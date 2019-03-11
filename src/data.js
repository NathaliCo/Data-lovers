window.dataLovers={
 //función para encontrar al pokemon random
 findPokemonRandom: function  (data,condition){  
  const pokemon=data.filter(pokemon=> (pokemon.Id == condition));
  return pokemon[0];
},
//función para encontrar al pokemon con el buscador
findPokemon: function (data, condition){  
  let UpperPokemon= condition.charAt(0).toUpperCase() + condition.slice(1);
  const pokemon=data.filter(pokemon=> (pokemon.Nombre == UpperPokemon));
  return pokemon[0];
},
//Función para filtrar por tipo de pokemón
filterType:function  (data, condition){
  const filterProperties = data.filter(pokemon => (pokemon.type[0] == condition || pokemon.type[1] == condition));
  return filterProperties;
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
 
  return pokemonOrder;
  }else if(sortOrder==="descendente"){
    pokemonOrder=data.sort(function(ob1,ob2){
      if (ob1[sortBy]<ob2[sortBy]){
        return 1;
      }else if(ob1[sortBy]> ob2[sortBy]) {
        return -1;
      }
    return 0;
    });
  }
  return pokemonOrder;
  },

computeStats: function(data, condition){
  let filterData=[];
  data.forEach(pokemon=>((filterData.push (pokemon[condition]))));
  let average = filterData.reduce(function(a, b){ return a + b; });
  average=average/filterData.length;
  return average;
   }
};
