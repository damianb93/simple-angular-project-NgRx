import {NgModule} from '@angular/core';

import {RecipeRoutingModule} from './recipe-routing.module';
import {RecipeComponent} from './recipe.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    RecipeListComponent
  ],
  imports: [
    RecipeRoutingModule,
    SharedModule
  ]
})
export class RecipeModule { }
