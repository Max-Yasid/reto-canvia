import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food/food.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  id!: any;
  food: Food | any = new Food();

  chipValues: string[] = [];

  private getChipsValues() {
    for (let property in this.food) {
      if (this.food[property] === true) this.chipValues.push(property);
    }
  }
  constructor(private route: ActivatedRoute, private foodService: FoodService) {
    this.id = this.route.snapshot.paramMap.get('id');
    const foodResult = foodService.getStoredFoodById(this.id);
    if (foodResult[0] && foodResult[0].summary) {
      this.food = foodResult[0];
      this.getChipsValues();
    } else {
      foodService.fetchFoodById(this.id).subscribe((food: Food) => {
        foodService.updateFood(food);
        this.food = food;
        this.getChipsValues();
      });
    }
  }
}
