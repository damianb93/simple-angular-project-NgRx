import {NgModule} from '@angular/core';

import {RecipeRoutingModule} from './recipe-routing.module';
import {RecipeComponent} from './recipe.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';
import {SharedModule} from "../../shared/shared.module";
import {RecipeServicesModule} from "./services/recipe-services.module";
import {DefaultRecipeDetailsComponent} from "./recipe-details/default-recipe-details.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";

@NgModule({
  declarations: [
    DefaultRecipeDetailsComponent,
    RecipeComponent,
    RecipeDetailsComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    RecipeListComponent,
  ],
  imports: [
    RecipeRoutingModule,
    RecipeServicesModule,
    SharedModule
  ]
})
export class RecipeModule { }
