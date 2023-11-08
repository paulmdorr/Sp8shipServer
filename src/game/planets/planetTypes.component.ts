import Component from '../../ecs/component';
import { PlanetType } from './planets.generator';

class PlanetTypesComponent extends Component {
  public types: Map<PlanetType, number>;

  constructor(types: Map<PlanetType, number> | null = null) {
    super('PlanetTypes');
    this.types = types ?? new Map();
  }
}

export default PlanetTypesComponent;
