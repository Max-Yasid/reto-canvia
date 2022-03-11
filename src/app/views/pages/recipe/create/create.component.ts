import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food/food.service';
import uniqueRandom from 'unique-random';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  chipValues: string[] = [];
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  foodCtrl = new FormControl();
  food: Food | any = new Food();
  constructor(private foodService: FoodService) {
    const random = uniqueRandom(20000, 100000);
    this.food.id = random();
    this.setNutritionFoodVariables();
  }

  setNutritionFoodVariables() {
    this.food.nutrition.nutrients[0] = {
      name: 'Calories',
      amount: 0,
      unit: 'Kcal',
    };
    this.food.nutrition.nutrients[1] = {
      name: 'Protein',
      amount: 0,
      unit: 'g',
    };
    this.food.nutrition.nutrients[2] = {
      name: 'Carbohydrates',
      amount: 0,
      unit: 'g',
    };
    this.food.nutrition.nutrients[3] = { name: 'Sugar', amount: 0, unit: 'g' };
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.chipValues.push(value);
    }

    event.chipInput!.clear();

    this.foodCtrl.setValue(null);
  }

  remove(Food: string): void {
    const index = this.chipValues.indexOf(Food);

    if (index >= 0) {
      this.chipValues.splice(index, 1);
    }
  }
  createHandler(e: any) {
    e.preventDefault();
    if (!this.food.title) return;
    this.chipValues.forEach((chip: string) => {
      this.food[chip] = true;
    });
    this.food.image = './../../../../../assets/images/1.jpg';
    this.foodService.createFood(this.food);
    this.food = new Food();
    this.setNutritionFoodVariables();
    alert('creado correctamente');
  }
}
