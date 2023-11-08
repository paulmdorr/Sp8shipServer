import test from 'ava';

import Component from '../component';

class TestComponent extends Component {
  public update() {
    console.log('TestComponent update');
  }
}

test('Component has a name', (t) => {
  const component = new TestComponent('Test Component');
  t.is(component.name, 'Test Component');
});
