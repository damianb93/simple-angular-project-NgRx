import {ActionReducerMap} from '@ngrx/store';
import {shoppingListReducer, ShoppingListState} from '../../modules/shopping-list/store/shopping-list.reducers';

export interface AppState {
  shoppingList: ShoppingListState;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer
};
