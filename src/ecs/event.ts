type EventListener<T> = (eventData: T) => void;
type EventListenerMap<T> = Map<string, EventListener<T>>;

abstract class Event {
  public abstract invoke(): void;

  public static getEventName(): string {
    return this.constructor.name;
  }

  public getEventName(): string {
    return this.constructor.name;
  }
}

class TypedEvent<T> extends Event {
  public data: T;

  private _listeners: EventListenerMap<T> = new Map();

  public invoke() {
    for (const listener of this._listeners.values()) {
      listener(this.data);
    }
  }

  public addListener(name: string, listener: EventListener<T>) {
    this._listeners.set(name, listener);
  }

  public removeListener(name: string) {
    this._listeners.delete(name);
  }

  public instantiate(data: T): TypedEvent<T> {
    const event = new TypedEvent<T>();

    event._listeners = this._listeners;
    event.data = data;

    return event;
  }

  public static getEventName(): string {
    return this.constructor.name;
  }

  public getEventName(): string {
    return this.constructor.name;
  }
}

export { Event, TypedEvent };
