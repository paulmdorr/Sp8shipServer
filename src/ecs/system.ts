import World from './world.js';

abstract class System {
  public name: string;

  protected _world: World;

  constructor(name: string) {
    this.name = name;
  }

  public abstract update(): void;

  public setWorld(world: World) {
    this._world = world;
  }
}

export default System;
