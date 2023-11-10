import System from './system';
import Entity from './entity';
import Component from './component';
import { Event } from './event';

class World {
  public systems: System[] = [];
  public entities: Entity[] = [];
  public componentsByType: Map<string, Component[]> = new Map();
  public mainLoopInterval: number;

  private _shouldStop = false;
  private _availableEvents: Map<string, Event> = new Map();
  private _eventsQueue: Event[] = [];

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

  public addEvent(name: string, event: Event) {
    this._availableEvents.set(name, event);
  }

  public getEvent(name: string): Event | undefined {
    return this._availableEvents.get(name);
  }

  public addEventToQueue(event: Event) {
    this._eventsQueue.push(event);
  }

  public start() {
    this.mainLoop();
  }

  private mainLoop() {
    this.processEvents();
    this.update();

    if (!this._shouldStop) {
      setTimeout(() => {
        this.mainLoop();
      }, this.mainLoopInterval);
    }
  }

  public update() {
    this.systems.forEach((system) => system.update());
  }

  public getEntity(uuid: string): Entity | undefined {
    return this.entities.find((entity) => entity.id === uuid);
  }

  public getSystem(name: string): System | undefined {
    return this.systems.find((system) => system.name === name);
  }

  public getEntitiesWithComponent(name: string): Entity[] {
    return this.entities.filter(
      (entity) => entity.getComponent(name) !== undefined,
    );
  }

  public getComponentsByType(type: string): Component[] | undefined {
    return this.componentsByType.get(type);
  }

  private addComponent(component: Component) {
    const componentType = component.constructor.name;
    const components = this.componentsByType.get(componentType) || [];
    components.push(component);
    this.componentsByType.set(componentType, components);
  }

  private processEvents() {
    this._eventsQueue.forEach((event) => {
      event.invoke();
    });

    this._eventsQueue = [];
  }
}

export default World;
