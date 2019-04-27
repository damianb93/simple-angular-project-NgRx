import {Routes} from "@angular/router";

export const CONTENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    loadChildren: './modules/recipe/recipe.module#RecipeModule'
  },
  {
    path: 'shopping-list',
    loadChildren: './modules/shopping-list/shopping-list.module#ShoppingListModule'
  }
];
