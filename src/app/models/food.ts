import { Nutrient } from './nutrient';

class Nutrition {
  nutrients: Nutrient[] = [new Nutrient(), new Nutrient(), new Nutrient()];
}

export class Food {
  id!: number;
  title: string = '';
  image: string | null = null;
  nutrition: Nutrition = new Nutrition();
  vegetarian: boolean = false;
  vegan: boolean = false;
  glutenFree: boolean = false;
  dairyFree: boolean = false;
  veryHealthy: boolean = false;
  cheap: boolean = false;
  veryPopular: boolean = false;
  sustainable: boolean = false;
  summary: string = '';
}
