import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../services/recipe.service";
import {takeWhile, tap} from "rxjs/operators";
import {LifeCycle} from "../../../core/models/life.cycle.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent extends LifeCycle implements OnInit {

  recipes: Array<Recipe>;

  private getRecipes$ = this.recipeService.recipesChanged
    .pipe(
      takeWhile(() => this.alive),
      tap(recipes => this.recipes = recipes)
    );

  constructor(private recipeService: RecipeService) {
    super();
  }

  ngOnInit() {
    this.getRecipes$.subscribe();
  }
}
