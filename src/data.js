
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
          printFirstData(pokemon);
          return pokemon.id;
      }
  }
},

//Función para filtrar por tipo de pokemón
  filterType:function  (data, condition){
    const filterProperties = data.filter(pokemon => (pokemon.type[0] == condition || pokemon.type[1] == condition));
    filterProperties.forEach(elemento=>(console.log(
    elemento.name, elemento.type, elemento.weaknesses)));
    },


sortData: function (data, sortBy, sortOrder){
  if (sortOrder==="ascendente"){
  data.sort(function(ob1,ob2){
    if (ob1[sortBy]>ob2[sortBy]){
      return 1;
    }else if(ob1[sortBy]< ob2[sortBy]) {
      return -1;
    }
  return 0;
  });
  for (let i=0; i<data.length; i++){

  console.log(data[i][sortBy]);
  }
  }else if(sortOrder==="descendente"){
    data.sort(function(ob1,ob2){
      if (ob1[sortBy]<ob2[sortBy]){
        return 1;
      }else if(ob1[sortBy]> ob2[sortBy]) {
        return -1;
      }
    return 0;
    });
    for (let i=0; i<data.length; i++){
      
    console.log(data[i][sortBy]);
    }
  }
  }

};
