import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {Store} from '@ngrx/store';
import {AddIngredients} from '../../shopping-list/store/shopping-list.actions';
import {RecipeFeatureState} from '../store/recipe.reducers';
import {DeleteRecipe} from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html'
})
export class RecipeDetailsComponent implements OnInit {
  selectedRecipe: Recipe;
  selectedRecipeId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<RecipeFeatureState>) {
  }

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
    this.store.dispatch(new AddIngredients(this.selectedRecipe.ingredients));
  }

  deleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.selectedRecipeId));
    this.router.navigateByUrl('/recipes');
  }
}
