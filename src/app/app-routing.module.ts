import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./views/pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'recipe',
    loadChildren: () =>
      import('./views/pages/recipe/recipe.module').then(m => m.RecipeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
