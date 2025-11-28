import { test } from '../fixtures/pokemon-api.fixture';

test.describe('Pokemon Evolution Chain API Tests', () => {
  test('Should get Squirtle evolution chain with names and weights sorted alphabetically', async ({ pokemonApi }) => {
    await test.step('Process Squirtle evolution chain', async () => {
      await pokemonApi.processSquirtleEvolutionChain();
    });
  });
});