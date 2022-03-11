import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food/food.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  length: number = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  foods!: Food[];
  paginatedFoods: Food[] = [];

  constructor(private foodService: FoodService) {
    let foods: Food[] = JSON.parse(sessionStorage.getItem('foods') as string);
    if (!foods) {
      this.foodService.fetchANumberOfFoods(100).subscribe((foods): void => {
        sessionStorage.setItem('foods', JSON.stringify(foods.results));

        this.foodAndPaginationSetup();
      });
    } else {
      this.foodAndPaginationSetup();
    }
  }
  foodAndPaginationSetup() {
    this.foods = this.foodService.getAllFoods();
    this.length = this.foods.length;
    this.paginatedFoods = this.foods.slice(0, this.pageSize);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(e => {
      const itemsToSkip = e.pageIndex * e.pageSize;
      this.paginatedFoods = this.foods.slice(
        itemsToSkip,
        itemsToSkip + e.pageSize
      );
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map(str => +str);
    }
  }
  removeFood(id: string | number): void {
    this.foodService.removeFood(id);
    this.foodAndPaginationSetup();
  }
}
