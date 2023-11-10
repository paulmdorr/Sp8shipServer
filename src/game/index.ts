import World from '../ecs/world';
import System from '../ecs/system';
import { generatePlanets } from './planets/planets.generator';
import PlanetTypesComponent from './planets/planetTypes.component';
import ResourcesComponent from './planets/resources.component';
import {
  AddResourceEventData,
  RESOURCE_EVENT_NAME,
  resourcesEvent,
} from './planets/resources.events';
import { ResourceType } from './planets/planets.generator';
import { TypedEvent } from '../ecs/event';

const game = new World(1000);

class TestSystem extends System {
  public update() {
    // console.log('TestSystem update');
  }
}

const planets = generatePlanets(1000);

for (const planet of planets) {
  game.addEntity(planet);
  // console.log(`Added planet ${planet.name}`);
  //print types and resources
  // console.log(
  //   (planet.getComponent('PlanetTypes') as PlanetTypesComponent).types,
  // );
  // console.log(
  //   (planet.getComponent('Resources') as ResourcesComponent).resources,
  // );
}

// Systems
game.addSystem(new TestSystem('Test System'));

// Events
game.addEvent(RESOURCE_EVENT_NAME, resourcesEvent);

// QUICK EXAMPLE OF HOW TO USE EVENTS
// THIS SHOULD BE IN A SYSTEM OR SOMETHING LIKE THAT
const addResourceToPlanetEvent = {
  planetUUID: planets[0].id,
  resourceType: (
    planets[0].getComponent('Resources') as ResourcesComponent
  ).resources
    .keys()
    .next().value as ResourceType,
  amount: 12,
  world: game,
};
const resourcesEventSaved = game.getEvent(
  RESOURCE_EVENT_NAME,
) as TypedEvent<AddResourceEventData>;
const instantiatedResourcesEvent = resourcesEventSaved?.instantiate(
  addResourceToPlanetEvent,
);
instantiatedResourcesEvent.data = addResourceToPlanetEvent;

game.addEventToQueue(instantiatedResourcesEvent);
// END OF EXAMPLE

export default game;
