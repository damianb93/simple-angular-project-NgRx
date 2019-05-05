import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RecipeFeatureState, RecipeState} from '../store/recipe.reducers';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {

  recipeState$: Observable<RecipeState>;

  constructor(private store: Store<RecipeFeatureState>) {
  }

  ngOnInit() {
    this.recipeState$ = this.store.select('recipes');
  }
}
