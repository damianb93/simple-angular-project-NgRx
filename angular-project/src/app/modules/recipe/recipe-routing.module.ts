import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeComponent} from "./recipe.component";
import {DefaultRecipeDetailsComponent} from "./recipe-details/default-recipe-details.component";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {RecipeDetailsResolver} from "./services/recipe-details.resolver";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";

const routes: Routes = [
  {
    path: '',
    component: RecipeComponent,
    children: [
      {
        path: '',
        component: DefaultRecipeDetailsComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent
      },
      {
        path: ':id',
        component: RecipeDetailsComponent,
        resolve: {recipe: RecipeDetailsResolver},
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: {recipe: RecipeDetailsResolver},
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
