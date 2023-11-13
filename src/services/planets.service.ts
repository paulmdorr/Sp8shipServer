import game from '../game';
import { AddPlanetInput, AddResourceInput } from '../generated/graphql';
import Entity from '../ecs/entity';
import ResourcesComponent from '../game/planets/resources.component';
import { ResourceType } from '../game/planets/planets.generator';
import { TypedEvent } from '../ecs/event';
import {
  AddResourceEventData,
  RESOURCE_EVENT_NAME,
} from '../game/planets/resources.events';

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
        ([type, amount]) => ({
          type,
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

export { getAllPlanets, getPlanetById, addPlanet, addResourceToPlanet };
