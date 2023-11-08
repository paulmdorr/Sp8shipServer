import test from 'ava';

import Entity from '../entity';
import Component from '../component';

class TestEntity extends Entity {
  public update() {
    console.log('TestEntity update');
  }
}

class TestComponent extends Component {
  public update() {
    console.log('TestComponent update');
  }
}

test('Entity has a name', (t) => {
  const entity = new TestEntity('Test Entity');
  t.is(entity.name, 'Test Entity');
});

test('Entity has a unique id', (t) => {
  const entity1 = new TestEntity('Test Entity 1');
  const entity2 = new TestEntity('Test Entity 2');
  t.not(entity1.id, entity2.id);
});

test('Entity has a list of components', (t) => {
  const entity = new TestEntity('Test Entity');
  t.deepEqual(entity.components, []);
});

test('Entity can add a component', (t) => {
  const entity = new TestEntity('Test Entity');
  const component = new TestComponent('Test Component');
  entity.addComponent(component);
  t.deepEqual(entity.components, [component]);
});

test('Entity can get a component by name', (t) => {
  const entity = new TestEntity('Test Entity');
  const component = new TestComponent('Test Component');
  entity.addComponent(component);
  t.is(entity.getComponent('Test Component'), component);
});

test('Entity can update its components', (t) => {
  const entity = new TestEntity('Test Entity');
  const component = new TestComponent('Test Component');
  entity.addComponent(component);
  t.notThrows(() => entity.update());
});

test('Entity can have hundreds of thousands of components', (t) => {
  const entity = new TestEntity('Test Entity');

  for (let i = 0; i < 100000; i++) {
    entity.addComponent(new TestComponent(`Test Component ${i}`));
  }

  t.is(entity.components.length, 100000);
});
