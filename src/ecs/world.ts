import System from './system';
import Entity from './entity';
import Component from './component';

class World {
  public systems: System[] = [];
  public entities: Entity[] = [];
  public componentsByType: Map<string, Component[]> = new Map();
  public mainLoopInterval: number;

  private _shouldStop = false;

  constructor(mainLoopInterval: number) {
    this.mainLoopInterval = mainLoopInterval;
  }

  public addSystem(system: System) {
    this.systems.push(system);
    system.setWorld(this);
  }

  public addEntity(entity: Entity) {
    this.entities.push(entity);
    entity.setWorld(this);

    entity.components.forEach((component) => {
      this.addComponent(component);
    });
  }

  public start() {
    this.mainLoop();
  }

  private mainLoop() {
    this.update();

    if (!this._shouldStop) {
      setTimeout(() => {
        this.mainLoop();
      }, this.mainLoopInterval);
    }
  }

  public update() {
    this.systems.forEach((system) => system.update());
    this.entities.forEach((entity) => entity.update());
  }

  public getEntity(name: string): Entity | undefined {
    return this.entities.find((entity) => entity.name === name);
  }

  public getSystem(name: string): System | undefined {
    return this.systems.find((system) => system.name === name);
  }

  public getEntitiesWithComponent(name: string): Entity[] {
    return this.entities.filter(
      (entity) => entity.getComponent(name) !== undefined,
    );
  }

  public getComponentsByType(name: string): Component[] | undefined {
    return this.componentsByType.get(name);
  }

  private addComponent(component: Component) {
    const components = this.componentsByType.get(component.name) || [];
    components.push(component);
    this.componentsByType.set(component.constructor.name, components);
  }
}

export default World;
