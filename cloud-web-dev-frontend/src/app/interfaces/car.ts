import { Exhaust } from './exhaust';
import { Rim } from './rim';

export interface Car {
  model_name: string;
  id: string;
  description: string;
  is_super_car: boolean;
  base_price: number;
  rimOptions: Array<Rim>;
  exhaustOptions: Array<Exhaust>;
  image_url: string;
  youtube_slug: string;
}
