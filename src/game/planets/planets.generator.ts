import Entity from '../../ecs/entity';
import { createPlanet } from './planet.creator';

enum PlanetType {
  Desert = 'Desert',
  Forest = 'Forest',
  Ocean = 'Ocean',
  Tundra = 'Tundra',
  Highland = 'Highland',
  Savannah = 'Savannah',
  Jungle = 'Jungle',
  Arctic = 'Arctic',
  Swamp = 'Swamp',
  Volcanic = 'Volcanic',
  Barren = 'Barren',
  Toxic = 'Toxic',
  Radiated = 'Radiated',
}

enum ResourceType {
  Food = 'Food',
  Iron = 'Iron',
  Gold = 'Gold',
  Copper = 'Copper',
  Silver = 'Silver',
  Titanium = 'Titanium',
  Uranium = 'Uranium',
  Plutonium = 'Plutonium',
  Water = 'Water',
  Oxygen = 'Oxygen',
  Hydrogen = 'Hydrogen',
  Nitrogen = 'Nitrogen',
  Silicon = 'Silicon',
  Aluminium = 'Aluminium',
  Mercury = 'Mercury',
  Cobalt = 'Cobalt',
}

function generatePlanets(amount: number): Entity[] {
  const planets: Entity[] = [];

  for (let i = 0; i < amount; i++) {
    const { resources, planetTypes } = generateRandomResources();
    const planet = createPlanet(`Planet ${i}`, resources, planetTypes);

    planets.push(planet);
  }

  return planets;
}

function generateRandomResources(): {
  resources: Map<ResourceType, number>;
  planetTypes: Map<PlanetType, number>;
} {
  const planetTypes = new Map<PlanetType, number>();
  let typesTotalPercentage = 0;

  for (const type of Object.values(PlanetType)) {
    if (Math.random() < 0.5) {
      continue;
    }

    // percentage of the planet type, between 20% and 50%
    const percentage = Math.min(
      Math.floor(Math.random() * 40 + 20),
      100 - typesTotalPercentage,
    );

    planetTypes.set(type, percentage);
    typesTotalPercentage += percentage;

    if (typesTotalPercentage === 100) {
      break;
    }
  }

  const resources = new Map<ResourceType, number>();

  for (const type of Object.values(ResourceType)) {
    if (resources.size >= 5) {
      break;
    }

    if (Math.random() < 0.5) {
      continue;
    }

    // amount of the resource, between 1000 and 10000
    const amount = Math.floor(Math.random() * 9000 + 1000);

    resources.set(type, amount);
  }

  return { resources, planetTypes };
}

export { PlanetType, ResourceType, generatePlanets };
