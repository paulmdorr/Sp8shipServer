import Component from '../../ecs/component';
import { ResourceType } from './planets.generator';

class ResourcesComponent extends Component {
  public resources: Map<ResourceType, number>;

  constructor(resources: Map<ResourceType, number> | null = null) {
    super('Resources');
    this.resources = resources ?? new Map();
  }

  public getResourceAmount(name: ResourceType): number {
    return this.resources.get(name) ?? 0;
  }

  public extractResource(name: ResourceType, amount: number): number {
    const currentAmount = this.getResourceAmount(name);
    const extractedAmount = Math.min(currentAmount, amount);

    this.resources.set(name, currentAmount - extractedAmount);

    return extractedAmount;
  }
}

export default ResourcesComponent;
