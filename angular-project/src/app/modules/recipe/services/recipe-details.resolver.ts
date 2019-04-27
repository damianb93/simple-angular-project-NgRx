import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../recipe.model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {RecipeServicesModule} from "./recipe-services.module";
import {RecipeService} from "./recipe.service";

@Injectable({
  providedIn: RecipeServicesModule
})
export class RecipeDetailsResolver implements Resolve<Recipe>{

  constructor(private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    return this.recipeService.getRecipes().find((value, index) => index === +route.params['id']);
  }

}
