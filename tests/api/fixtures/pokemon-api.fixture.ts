import { test as base } from '@playwright/test';
import { PokemonApiHelper } from '../helpers/pokemon-api.helper';

type ApiFixtures = {
  pokemonApi: PokemonApiHelper;
};

export const test = base.extend<ApiFixtures>({
  pokemonApi: async ({ request }, use) => {
    await use(new PokemonApiHelper(request));
  },
});

export { expect } from '@playwright/test';