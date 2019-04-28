import {Injectable} from "@angular/core";
import {RecipeServicesModule} from "./recipe-services.module";
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../../core/models/ingredient.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: RecipeServicesModule
})
export class RecipeService {

  private recipes: Array<Recipe> = [
    new Recipe(
      'Test 1',
      'test description 1',
      'https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French fries', 20)
      ]),
    new Recipe(
      'Test 2',
      'test description 2',
      'https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d',
      [
        new Ingredient('Bread', 1),
        new Ingredient('Meat', 1)
      ])
  ];

  recipesChanged = new BehaviorSubject<Array<Recipe>>(this.getRecipes());

  constructor(private slService: ShoppingListService) {}

  getRecipes(): Array<Recipe> {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): number {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
    return this.recipes.length - 1;
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next((this.getRecipes()));
  }
}
