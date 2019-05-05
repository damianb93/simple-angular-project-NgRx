import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {StartEdit} from './store/shopping-list.actions';
import {AppState} from '../../core/store/app.reducers';
import {ShoppingListState} from './store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingListState$: Observable<ShoppingListState>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.shoppingListState$ = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
