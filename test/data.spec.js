require('../src/data.js');
const POKEMON = require("../src/data/pokemon/pokemon.json");

let newData=POKEMON.pokemon;
const translateData = newData.map( item => { 
  return { Id: item.id, Número: item.num, Nombre: item.name, Imagen:item.img, Tipo: item.type , Altura : item.height, Peso: item.weight, Dulces: item.candy, Número_de_dulces: item.candy_count, Huevos: item.egg, Probabilidades_de_aparición: item.spawn_chance,  Hora_más_activa_de_apariciones: item.spawn_time, Próxima_evolución: item.next_evolution, Evolución_anterior: item.prev_evolution}; 
});

describe('filtrarNombre', () => {
  it('Filtrar por nombre es una función', () => {
    expect(typeof dataLovers.findPokemon).toBe("function");
  });

  it('Filtrar por nombre', () => {
    expect(dataLovers.findPokemon(translateData, "Venusaur")).toBe(translateData[2]);
  });

  it('Filtrar por nombre', () => {
    expect(dataLovers.findPokemon(translateData, "Bulbasaur")).toBe(translateData[0]);
  });

});

describe('filtrarRandom', () => {
  it('Filtrar por id es una función', () => {
    expect(typeof dataLovers.findPokemonRandom).toBe("function");
  });
  it('Filtrar por id', () => {
    expect(dataLovers.findPokemonRandom(translateData, 5)).toBe(translateData[4]);
  });
});

describe('filtrarTipo', () => {
  it('Filtrar por tipo es una función', () => {
    expect(typeof dataLovers.filterType).toBe("function");
  });
  it('Filtrar por tipo fuego', () => {
    const filterProperties = dataLovers.filterType(POKEMON.pokemon, "Fire");
    expect(filterProperties).toHaveLength(12);
  });
  it('Filtrar por tipo agua', () => {
    const filterProperties = dataLovers.filterType(POKEMON.pokemon, "Water");
    expect(filterProperties).toHaveLength(32);
  });
  it('Filtrar por tipo volador', () => {
    const filterProperties = dataLovers.filterType(POKEMON.pokemon, "Flying");
    expect(filterProperties).toHaveLength(19);
  });
});

describe('Ordenar', () => {
  it('Ordenar es una función', () => {
    expect(typeof dataLovers.sortData).toBe("function");
  });
  it('Ordenar por id ascendente', () => {
    const pokemonOrder = dataLovers.sortData(POKEMON.pokemon, "id", "ascendente");
    expect(pokemonOrder).toHaveLength(151);
  });

  it('Ordenar por id descendente', () => {
    const pokemonOrder = dataLovers.sortData(POKEMON.pokemon, "id", "descendente");
    expect(pokemonOrder).toHaveLength(151);
  });

  test('ordenar por nombre descendente', () => {
    expect(dataLovers.sortData(POKEMON.pokemon, "name", "descendente")).toMatchObject(POKEMON.pokemon);
  });

  test('ordenar por nombre ascendente', () => {
    expect(dataLovers.sortData(POKEMON.pokemon, "name", "ascendente")).toMatchObject(POKEMON.pokemon);
  });
});

describe('Promedio', () => {
  it('Obtener promedio es una función', () => {
    expect(typeof dataLovers.computeStats).toBe("function");
  });
  it('Calcular promedios', () => {
    expect(dataLovers.computeStats(POKEMON.pokemon, "spawn_chance")).toBe(0.7319854304635764);
  });
});
