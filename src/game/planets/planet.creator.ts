import Entity from '../../ecs/entity';
import ResourcesComponent from './resources.component';
import PlanetTypesComponent from './planetTypes.component';
import { PlanetType, ResourceType } from './planets.generator';

function createPlanet(
  name: string,
  resources: Map<ResourceType, number> | null = null,
  planetTypes: Map<PlanetType, number> | null = null,
): Entity {
  const planet = new Entity(name);

  planet.addComponent(new ResourcesComponent(resources));
  planet.addComponent(new PlanetTypesComponent(planetTypes));

  return planet;
}

export { createPlanet };
