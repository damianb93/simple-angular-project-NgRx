import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../core/models/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {takeWhile, tap} from "rxjs/operators";
import {LifeCycle} from "../../core/models/life.cycle.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent extends LifeCycle implements OnInit {

  ingredients: Array<Ingredient>;

  constructor(private slService: ShoppingListService) {
    super();
  }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.onIngredientsUpdate();
  }

  onIngredientsUpdate() {
    this.slService.ingredientsChanged
      .pipe(
        takeWhile(() => this.alive),
        tap((updatedIngredients) => this.ingredients = updatedIngredients),
      ).subscribe();
  }

  onEditItem(index: number) {
    this.slService.ingredientEdited.next(index);
  }
}
