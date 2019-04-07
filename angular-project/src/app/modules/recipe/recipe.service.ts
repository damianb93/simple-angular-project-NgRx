import {EventEmitter, Injectable} from "@angular/core";
import {RecipeServicesModule} from "./recipe-services.module";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../../core/models/ingredient.model";
import {ShoppingListService} from "../../core/services/shopping-list.service";

@Injectable({
  providedIn: RecipeServicesModule
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

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

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>) {
    this.slService.addIngredients(ingredients);
  }

}
