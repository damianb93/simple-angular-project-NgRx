import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html'
})
export class RecipeDetailsComponent implements OnInit {

  selectedRecipe: Recipe;
  selectedRecipeId: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    combineLatest(this.route.data, this.route.params)
      .subscribe(
        ([data, params]) => {
          this.selectedRecipe = data['recipe'];
          this.selectedRecipeId = params['id'];
        }
      );
  }

  addIngredientsToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.selectedRecipeId);
    this.router.navigateByUrl('/recipes');
  }
}
