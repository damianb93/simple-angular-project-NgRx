import {Routes} from '@angular/router';
import {HomeComponent} from '../../layout/home/home.component';
import {ShoppingListComponent} from '../../modules/shopping-list/shopping-list.component';

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
    component: ShoppingListComponent
  }
];
