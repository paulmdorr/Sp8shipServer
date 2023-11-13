import { AddResourceInput, Scalars } from '../../generated/graphql.js';
import {
  getAllPlanets,
  addResourceToPlanet,
  getPlanetById,
} from '../../services/planets.service.js';

const resolvers = {
  Query: {
    planets: () => getAllPlanets(),
    planet: (_, { planetId }: { planetId: Scalars['ID']['input'] }) => {
      return getPlanetById(planetId);
    },
  },
  Mutation: {
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
