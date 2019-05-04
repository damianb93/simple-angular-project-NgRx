import {Routes} from "@angular/router";
import {HomeComponent} from "../../layout/home/home.component";

export const CONTENT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
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
