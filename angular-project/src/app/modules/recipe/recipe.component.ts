import {Component, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";
import {takeWhile, tap} from "rxjs/operators";
import {LifeCycle} from "../../core/models/life.cycle.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent extends LifeCycle implements OnInit {

  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {
    super();
  }

  ngOnInit() {
    this.onRecipeSelection();
  }

  private onRecipeSelection() {
    this.recipeService.recipeSelected
      .pipe(
        takeWhile(() => this.alive),
        tap(recipe => this.selectedRecipe = recipe)
      ).subscribe();
  }
}
