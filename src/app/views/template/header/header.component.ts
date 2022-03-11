import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food/food.service';
import { Food } from 'src/app/models/food';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  foods!: Food[];
  constructor(private foodService: FoodService) {
    document.body.classList.add('grey-background');
    this.foods = this.foodService.getAllFoods();
  }
  refreshFoodData(e: any) {
    const inputValue = e.target.value.toLowerCase();
    this.foods = this.foodService
      .getAllFoods()
      .filter((food: Food) => food.title.toLowerCase().includes(inputValue));
    console.log(this.foods);
  }

  resetData() {
    this.foodService.fetchANumberOfFoods(100).subscribe((foods): void => {
      sessionStorage.setItem('foods', JSON.stringify(foods.results));
      alert('se resetearon los datos exitosamente.');
    });
  }
}
