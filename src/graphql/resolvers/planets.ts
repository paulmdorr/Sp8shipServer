import { ResourceType } from '../../game/planets/planets.generator.js';
import ResourcesComponent from '../../game/planets/resources.component.js';
import {
  AddPlanetInput,
  AddResourceInput,
  Planet,
  Scalars,
} from '../../generated/graphql.js';
import {
  getAllPlanets,
  addPlanet,
  addResourceToPlanet,
} from '../../services/planets.service.js';

const resolvers = {
  Query: {
    planets: () => getAllPlanets(),
  },
  Mutation: {
    addPlanet: (_, { input }: { input: AddPlanetInput }) => {
      const newPlanet = addPlanet(input);

      return newPlanet;
    },
    addResourceToPlanet: (
      _,
      {
        planetId,
        input,
      }: { planetId: Scalars['ID']['input']; input: AddResourceInput },
    ) => {
      const { type, amount } = input;

      addResourceToPlanet(planetId, { type, amount });

      return true;
    },
  },
};

export default resolvers;
