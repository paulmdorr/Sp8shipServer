import game from '../game';
import { AddPlanetInput } from '../generated/graphql';
import Entity from '../ecs/entity';
import ResourcesComponent from '../game/planets/resources.component';

function getAllPlanets() {
  const planets = game.entities.filter((entity) =>
    entity.hasComponent('PlanetTypes'),
  );

  const response = planets.map((planet) => {
    const resourcesComponent = planet.getComponent(
      'Resources',
    ) as ResourcesComponent;

    return {
      id: planet.id,
      name: planet.name,
      resources: Array.from(resourcesComponent.resources.entries()).map(
        ([name, amount]) => ({
          name,
          amount,
        }),
      ),
    };
  });

  return response;
}

function getPlanetById(id) {
  return game.entities.find((entity) => entity.id === id);
}

function addPlanet(planetData: AddPlanetInput) {
  const planet = new Entity(planetData.name);
  const resources = new ResourcesComponent();

  planet.addComponent(resources);

  return planet;
}

export { getAllPlanets, getPlanetById, addPlanet };
