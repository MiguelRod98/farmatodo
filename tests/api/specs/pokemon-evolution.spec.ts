import { test, expect } from '../fixtures/pokemon-api.fixture';

test.describe('Pokemon Evolution Chain API Tests', () => {
  test('Should get Squirtle evolution chain with names and weights sorted alphabetically', async ({ pokemonApi }) => {
    await pokemonApi.processSquirtleEvolutionChain();
  });
});