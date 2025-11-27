import { APIRequestContext, expect } from '@playwright/test';

export class PokemonApiHelper {
  constructor(private request: APIRequestContext) {}

  private async getPokemonData(name: string) {
    const response = await this.request.get(`${name}`);
    expect(response.status()).toBe(200);
    return response.json();
  }

  private async getEvolutionChainData() {
    const squirtleData = await this.getPokemonData('squirtle');
    
    const speciesResponse = await this.request.get(squirtleData.species.url);
    expect(speciesResponse.status()).toBe(200);
    const speciesData = await speciesResponse.json();

    const evolutionResponse = await this.request.get(speciesData.evolution_chain.url);
    expect(evolutionResponse.status()).toBe(200);
    return evolutionResponse.json();
  }

  private extractEvolutionNames(evolutionChain: any): string[] {
    const pokemonNames = [evolutionChain.species.name];
    evolutionChain.evolves_to.forEach((evolution: any) => pokemonNames.push(...this.extractEvolutionNames(evolution)));
    return pokemonNames;
  }

  private bubbleSort(pokemonNames: string[]): string[] {
    const sortedNames = [...pokemonNames];
    for (let outerIndex = 0; outerIndex < sortedNames.length - 1; outerIndex++) {
      for (let innerIndex = 0; innerIndex < sortedNames.length - outerIndex - 1; innerIndex++) {
        if (sortedNames[innerIndex] > sortedNames[innerIndex + 1]) {
          [sortedNames[innerIndex], sortedNames[innerIndex + 1]] = [sortedNames[innerIndex + 1], sortedNames[innerIndex]];
        }
      }
    }
    return sortedNames;
  }

  private async getPokemonWeights(pokemonNames: string[]) {
    const pokemonList: { name: string; weight: number }[] = [];
    for (const pokemonName of pokemonNames) {
      const pokemonData = await this.getPokemonData(pokemonName);
      pokemonList.push({ name: pokemonData.name, weight: pokemonData.weight });
    }
    return pokemonList;
  }

  private validateResults(evolutionChainResult: { name: string; weight: number }[]) {
    expect(evolutionChainResult).toHaveLength(3);
    expect(evolutionChainResult[0].name).toBe('blastoise');
    expect(evolutionChainResult[1].name).toBe('squirtle');
    expect(evolutionChainResult[2].name).toBe('wartortle');
  }

  private displayResults(evolutionChainResult: { name: string; weight: number }[]) {
    console.log('Squirtle Evolution Chain (Alphabetically Sorted)');
    evolutionChainResult.forEach(pokemon => {
      console.log(`${pokemon.name.charAt(0) + pokemon.name.slice(1)}: ${pokemon.weight}`);
    });
  }

  async processSquirtleEvolutionChain(): Promise<void> {
    const evolutionChainData = await this.getEvolutionChainData();
    const pokemonNames = this.extractEvolutionNames(evolutionChainData.chain);
    const pokemonWithWeights = await this.getPokemonWeights(pokemonNames);
    const sortedPokemonNames = this.bubbleSort(pokemonNames);
    const sortedEvolutionChain = sortedPokemonNames.map(pokemonName => pokemonWithWeights.find(pokemon => pokemon.name === pokemonName)!);
    
    this.validateResults(sortedEvolutionChain);
    this.displayResults(sortedEvolutionChain);
  }
}