import {NgModule} from '@angular/core';
import {ShoppingListRoutingModule} from "./shopping-list-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    SharedModule,
    ShoppingListRoutingModule,
    ReactiveFormsModule
  ]
})
export class ShoppingListModule { }
