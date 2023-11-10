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
  getPlanetById,
  addPlanet,
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
      const planets = getAllPlanets();
      const planet = planets.find((planet) => planet.id === planetId);
      const { name, amount } = input;
      const resourcesComponent = planet?.getComponent(
        'Resources',
      ) as ResourcesComponent;

      if (!planet) {
        throw new Error(`Planet with id ${planetId} not found`);
      }

      const newResource = {
        id: String(resourcesComponent.resources.values.length + 1),
        name,
        amount,
      };

      resourcesComponent.resources.set(ResourceType[name], amount);

      return newResource;
    },
  },
};

export default resolvers;
