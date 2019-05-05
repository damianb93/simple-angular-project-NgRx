import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from '../recipe.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {RecipeServicesModule} from './recipe-services.module';
import {Store} from '@ngrx/store';
import {RecipeFeatureState, RecipeState} from '../store/recipe.reducers';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: RecipeServicesModule
})
export class RecipeDetailsResolver implements Resolve<Recipe> {

  constructor(private store: Store<RecipeFeatureState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    return this.store.select('recipes')
      .pipe(
        take(1),
        map((recipeState: RecipeState) => recipeState.recipes
          .find((val, index) => index === +route.params['id'])));
  }
}
