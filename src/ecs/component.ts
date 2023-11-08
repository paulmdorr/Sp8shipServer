import Entity from './entity';

abstract class Component {
  public name: string;
  public entity: Entity;

  constructor(name: string) {
    this.name = name;
  }

  public setEntity(entity: Entity) {
    this.entity = entity;
  }

  public abstract update(): void;
}

export default Component;
