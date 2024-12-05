import { Exhaust } from './exhaust';
import { Rim } from './rim';

export interface ConfiguredCar {
  modelName: string;
  id: string;
  price: number;
  rim: Rim;
  exhaust: Exhaust;
}
