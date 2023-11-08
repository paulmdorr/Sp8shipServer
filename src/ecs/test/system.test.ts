import test from 'ava';

import System from '../system';

class TestSystem extends System {
  public update() {
    console.log('TestSystem update');
  }
}

test('System has a name', (t) => {
  const system = new TestSystem('Test System');
  t.is(system.name, 'Test System');
});
