import {Recipe} from '../recipe.model';
import {Ingredient} from '../../../core/models/ingredient.model';
import {ADD_RECIPE, DELETE_RECIPE, RecipeActions, SET_RECIPES, UPDATE_RECIPE} from './recipe.actions';
import {AppState} from '../../../core/store/app.reducers';

export interface RecipeFeatureState extends AppState {
  recipes: RecipeState;
}

export interface RecipeState {
  recipes: Array<Recipe>;
}

const initialState: RecipeState = {
  recipes: [
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
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {...recipe, ...action.payload.updatedRecipe};
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes
      };

    case DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };

    default:
      return state;
  }
}
