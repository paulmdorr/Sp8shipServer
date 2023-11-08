import World from '../ecs/world';
import Entity from '../ecs/entity';
import Component from '../ecs/component';
import System from '../ecs/system';

const world = new World(1000);
const entity = new Entity('Test Entity');

class TestComponent extends Component {
  public update() {
    console.log('TestComponent update');
  }
}

class TestSystem extends System {
  public update() {
    console.log('TestSystem update');
  }
}

entity.addComponent(new TestComponent('Test Component'));
world.addEntity(entity);
world.addSystem(new TestSystem('Test System'));

export default world;
