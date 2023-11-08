import test from 'ava';

import World from '../world';
import System from '../system';
import Entity from '../entity';
import Component from '../component';

const world = new World(1000);

class TestSystem extends System {
  public update() {
    let count = 0;
    world.getComponentsByType('TestComponent')?.forEach((component) => {
      count++;
    });
    console.log(`Components updated: ${count}`);
  }
}

class TestEntity extends Entity {}

class TestComponent extends Component {}

test('World has a list of entities', (t) => {
  t.deepEqual(world.entities, []);
});

test('World has a list of systems', (t) => {
  t.deepEqual(world.systems, []);
});

test('World can add an entity', (t) => {
  const entity = new TestEntity('Test Entity');
  world.addEntity(entity);
  t.deepEqual(world.entities, [entity]);
});

test('World can add a system', (t) => {
  const system = new TestSystem('Test System');
  world.addSystem(system);
  t.deepEqual(world.systems, [system]);
});

test('World can update its systems and entities', (t) => {
  t.notThrows(() => world.update());
});

test('World can update a system with thousands of entities, which have several components', (t) => {
  const system = new TestSystem('Test System');

  for (let i = 0; i < 1000; i++) {
    const entity = new TestEntity(`Test Entity ${i}`);
    for (let i = 0; i < 10; i++) {
      entity.addComponent(new TestComponent(`Test Component ${i}`));
    }
    world.addEntity(entity);
  }

  world.addSystem(system);

  t.notThrows(() => world.update());
});
