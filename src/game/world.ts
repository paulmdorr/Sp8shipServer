import World from '../ecs/world';
import System from '../ecs/system';
import { generatePlanets } from './planets/planets.generator';
import PlanetTypesComponent from './planets/planetTypes.component';
import ResourcesComponent from './planets/resources.component';

const world = new World(1000);

class TestSystem extends System {
  public update() {
    // console.log('TestSystem update');
  }
}

const planets = generatePlanets(1000);

for (const planet of planets) {
  world.addEntity(planet);
  console.log(`Added planet ${planet.name}`);
  //print types and resources
  console.log(
    (planet.getComponent('PlanetTypes') as PlanetTypesComponent).types,
  );
  console.log(
    (planet.getComponent('Resources') as ResourcesComponent).resources,
  );
}

world.addSystem(new TestSystem('Test System'));

export default world;
