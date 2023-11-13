import game from '../game';
import { AddResourceInput } from '../generated/graphql';
import ResourcesComponent from '../game/planets/resources.component';
import { ResourceType } from '../game/planets/planets.generator';
import { TypedEvent } from '../ecs/event';
import {
  AddResourceEventData,
  RESOURCE_EVENT_NAME,
} from '../game/planets/resources.events';
import Entity from '../ecs/entity';

function getAllPlanets() {
  const planets = game.entities.filter((entity) =>
    entity.hasComponent('PlanetTypes'),
  );

  const response = planets.map((planet) => {
    return planetEntityToResponse(planet);
  });

  return response;
}

function getPlanetById(id: string) {
  const planet = game.entities.find((entity) => entity.id === id);

  console.log('id', id);
  console.log('planet', planet);

  if (!planet) {
    return null;
  }

  return planetEntityToResponse(planet);
}

function planetEntityToResponse(planet: Entity) {
  const resourcesComponent = planet.getComponent(
    'Resources',
  ) as ResourcesComponent;

  return {
    id: planet.id,
    name: planet.name,
    resources: Array.from(resourcesComponent.resources.entries()).map(
      ([type, amount]) => ({
        type,
        amount,
      }),
    ),
  };
}

function addResourceToPlanet(planetId: string, resourceData: AddResourceInput) {
  const addResourceToPlanetEvent = {
    planetUUID: planetId,
    resourceType: resourceData.type as ResourceType,
    amount: resourceData.amount,
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
}

export { getAllPlanets, getPlanetById, addResourceToPlanet };
