import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { FoodService } from 'src/app/services/food/food.service';
import { Food } from 'src/app/models/food';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  id: any = null;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();

  chipValues: string[] = [];
  chipValuesBeforeUpdate: string[] = [];
  food!: Food | any;

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
  private getChipsValues() {
    for (let property in this.food) {
      if (this.food[property] === true) {
        this.chipValuesBeforeUpdate.push(property);
        this.chipValues.push(property);
      }
    }
  }

  updateFood(e: any) {
    e.preventDefault();
    if (!this.food.title || !this.food.summary) return;
    this.chipValuesBeforeUpdate.forEach((chip: string) => {
      if (this.chipValues.includes(chip)) {
        this.food[chip] = true;
      } else {
        this.food[chip] = false;
      }
    });
    this.chipValues.forEach((chipAfter: string) => {
      if (this.chipValues.includes(chipAfter)) {
        this.food[chipAfter] = true;
      } else {
        this.food[chipAfter] = false;
      }
    });
    this.foodService.updateFood(this.food);
    alert('actualizado exitosamente');
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.chipValues.push(value);
    }

    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.chipValues.indexOf(fruit);

    if (index >= 0) {
      this.chipValues.splice(index, 1);
    }
  }
}
