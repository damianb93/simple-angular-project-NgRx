import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../../core/models/ingredient.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AddIngredient, DeleteIngredient, StopEdit, UpdateIngredient} from '../store/shopping-list.actions';
import {AppState} from '../../../core/store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [`
    input.ng-invalid.ng-touched, textarea.ng-invalid.ng-touched {
      border: 1px solid red;
    }
  `]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  shoppingListForm: FormGroup;
  editMode = false;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.initForm();

    this.store.select('shoppingList')
      .subscribe(data => {
        if (data.editedIngredientIndex > -1) {
          this.editMode = true;
          this.shoppingListForm.patchValue(data.editedIngredient);
        } else {
          this.editMode = false;
        }
      });
  }

  getFCtrl(fCtrlName: string): AbstractControl {
    return this.shoppingListForm.get(fCtrlName);
  }

  onSubmit() {
    if (!this.shoppingListForm.valid) {
      return;
    }

    const ingredient = new Ingredient(this.getFCtrl('name').value, this.getFCtrl('amount').value);

    this.editMode
      ? this.store.dispatch(new UpdateIngredient(ingredient))
      : this.store.dispatch(new AddIngredient(ingredient));


    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDeleteIngredient() {

    if (!this.editMode) {
      return;
    }

    this.store.dispatch(new DeleteIngredient());
    this.onClear();
  }

  private initForm() {
    this.shoppingListForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopEdit());
  }
}
