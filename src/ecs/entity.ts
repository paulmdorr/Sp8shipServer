import { v4 as uuidv4 } from 'uuid';

import Component from './component';
import World from './world';

class Entity {
  public id: string;
  public name: string;
  public components: Component[] = [];

  private _world: World;

  constructor(name: string) {
    this.name = name;
    this.id = uuidv4();
  }

  public addComponent(component: Component) {
    this.components.push(component);
    component.setEntity(this);
  }

  public getComponent(name: string): Component | undefined {
    return this.components.find((component) => component.name === name);
  }

  public hasComponent(name: string): boolean {
    return this.getComponent(name) !== undefined;
  }

  public setWorld(world: World) {
    this._world = world;
  }
}

export default Entity;
