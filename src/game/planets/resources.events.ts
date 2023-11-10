import { ResourceType } from './planets.generator';
import World from '../../ecs/world';
import ResourcesComponent from './resources.component';
import { TypedEvent } from '../../ecs/event';

type AddResourceEventData = {
  planetUUID: string;
  resourceType: ResourceType;
  amount: number;
  world: World;
};

function addResourceToPlanetListener(data: AddResourceEventData) {
  const { planetUUID, resourceType, amount, world } = data;
  const planet = world.getEntity(planetUUID);
  const resourcesComponent = planet?.getComponent(
    'Resources',
  ) as ResourcesComponent;

  console.log(`Adding ${amount} of ${resourceType} to ${planetUUID}`);
  console.log(resourcesComponent);

  if (planet && resourcesComponent) {
    resourcesComponent.resources.set(
      resourceType,
      (resourcesComponent.resources.get(resourceType) ?? 0) + amount,
    );
  }

  console.log(resourcesComponent);
}

const RESOURCE_EVENT_NAME = 'AddResourceToPlanetEvent';
const resourcesEvent = new TypedEvent<AddResourceEventData>();
resourcesEvent.addListener('AddResourceToPlanet', addResourceToPlanetListener);

export {
  addResourceToPlanetListener,
  AddResourceEventData,
  resourcesEvent,
  RESOURCE_EVENT_NAME,
};
