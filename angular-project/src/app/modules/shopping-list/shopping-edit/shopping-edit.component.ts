import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../../core/models/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LifeCycle} from "../../../core/models/life.cycle.model";
import {takeWhile, tap} from "rxjs/operators";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent extends LifeCycle implements OnInit {

  shoppingListForm: FormGroup;
  editMode = false;
  selectedIngredientId: number;

  private editForm$ = this.slService.ingredientEdited
    .pipe(
      takeWhile(() => this.alive),
      tap(index => {
        this.editMode = true;
        this.selectedIngredientId = index;
        this.shoppingListForm.patchValue(this.slService.getIngredient(index));
      })
    );

  constructor(private fb: FormBuilder, private slService: ShoppingListService) {
    super();
  }

  ngOnInit() {
    this.initForm();

    this.editForm$.subscribe();
  }

  getFCtrl(fCtrlName: string): AbstractControl {
    return this.shoppingListForm.get(fCtrlName);
  }

  onSubmit() {
    if (!this.shoppingListForm.valid) { return; }

    const ingredient = new Ingredient(this.getFCtrl('name').value, this.getFCtrl('amount').value);

    this.editMode
      ? this.slService.updateIngredient(this.selectedIngredientId, ingredient)
      : this.slService.addIngredient(ingredient);

    this.clearForm();
  }

  clearForm() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  deleteIngredient() {

    if (!this.editMode) { return; }

    this.slService.deleteIngredient(this.selectedIngredientId);
    this.clearForm();
  }

  private initForm() {
    this.shoppingListForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]]
    })
  }
}
