import {Ingredient} from '../../../core/models/ingredient.model';
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  ShoppingListActions,
  START_EDIT,
  STOP_EDIT,
  UPDATE_INGREDIENT
} from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Array<Ingredient>;
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {...ingredient, ...action.payload};

      const updIngredients = [...state.ingredients];
      updIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updIngredients
      };

    case DELETE_INGREDIENT:
      const delIngredients = state.ingredients;
      delIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: delIngredients
      };

    case START_EDIT:
      const startEditPayload = action.payload;
      return {
        ...state,
        editedIngredient: state.ingredients[startEditPayload],
        editedIngredientIndex: startEditPayload
      };

    case STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    default:
      return state;
  }
}
