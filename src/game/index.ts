import World from '../ecs/world';
import System from '../ecs/system';
import { generatePlanets } from './planets/planets.generator';
import {
  RESOURCE_EVENT_NAME,
  resourcesEvent,
} from './planets/resources.events';

const game = new World(1000);

class TestSystem extends System {
  public update() {
    // console.log('TestSystem update');
  }
}

const planets = generatePlanets(100);

for (const planet of planets) {
  game.addEntity(planet);
}

// Systems
game.addSystem(new TestSystem('Test System'));

// Events
game.addEvent(RESOURCE_EVENT_NAME, resourcesEvent);

export default game;
