import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../core/models/ingredient.model";
import {ShoppingListService} from "../../core/services/shopping-list.service";
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
    this.slService.ingredientsUpdate
      .pipe(
        takeWhile(() => this.alive),
        tap(() => this.ingredients = this.slService.getIngredients()),
      ).subscribe();
  }
}
