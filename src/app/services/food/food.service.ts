import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Food } from 'src/app/models/food';
import { Observable } from 'rxjs';

interface foodResults {
  results: Food[];
}

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private endpoint: string = 'https://api.spoonacular.com/recipes/';

  private apiKey: string = 'apiKey=85d951709a7046bd8381ca82ce8c2cdc';
  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });
  constructor(private http: HttpClient) {}

  fetchANumberOfFoods(numberOfResults: number): Observable<foodResults> {
    const url = `${this.endpoint}complexSearch?${this.apiKey}&maxProtein=99&number=${numberOfResults}&maxCarbs=99&maxCalories=99&maxSugar=99`;
    return this.http.get<foodResults>(url, { headers: this.headers });
  }

  fetchFoodById(id: string | number): Observable<Food> {
    const url = `${this.endpoint}${id}/information?${this.apiKey}`;
    return this.http.get<Food>(url, { headers: this.headers });
  }

  createFood(food: Food) {
    const foods = JSON.parse(sessionStorage.getItem('foods') as string);
    foods.push(food);
    sessionStorage.setItem('foods', JSON.stringify(foods));
    return { statusCode: 200 };
  }
  getAllFoods(): Food[] {
    return JSON.parse(sessionStorage.getItem('foods') as string);
  }

  getStoredFoodById(id: string | number) {
    const foods = JSON.parse(sessionStorage.getItem('foods') as string);
    return foods.filter((food: Food) => food.id == id);
  }

  updateFood(food: Food) {
    let foods = JSON.parse(sessionStorage.getItem('foods') as string);
    foods = foods.map((storedFood: Food) => {
      if (storedFood.id === food.id) {
        return { ...storedFood, ...food };
      }
      return storedFood;
    });
    sessionStorage.setItem('foods', JSON.stringify(foods));
  }

  removeFood(id: string | number): void {
    let foods = JSON.parse(sessionStorage.getItem('foods') as string);
    foods = foods.filter((food: Food) => food.id !== id);
    sessionStorage.setItem('foods', JSON.stringify(foods));
  }
}
