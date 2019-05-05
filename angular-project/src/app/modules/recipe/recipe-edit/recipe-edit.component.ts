import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {combineLatest} from 'rxjs';
import {Store} from '@ngrx/store';
import {RecipeFeatureState} from '../store/recipe.reducers';
import {AddRecipe, UpdateRecipe} from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: [`
    input.ng-invalid.ng-touched, textarea.ng-invalid.ng-touched {
      border: 1px solid red;
    }
  `]
})
export class RecipeEditComponent implements OnInit {

  editMode = false;
  recipe: Recipe;
  recipeForm: FormGroup;
  selectedRecipeId: number;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private store: Store<RecipeFeatureState>) {
  }

  ngOnInit() {

    combineLatest(this.route.data, this.route.params)
      .subscribe(
        ([data, params]) => {
          this.recipe = data['recipe'];
          this.editMode = !!this.recipe;
          this.selectedRecipeId = params['id'];

          this.initForm();
        }
      );
  }

  initForm() {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required]],
      imagePath: ['', [Validators.required]],
      description: ['', [Validators.required]],
      ingredients: this.fb.array([])
    });

    if (this.editMode) {
      this.fillFormWithSelectedRecipe();
    }
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  getFCtrl(fCtrlName: string): AbstractControl {
    return this.recipeForm.get(fCtrlName);
  }

  onSubmit() {
    if (!this.recipeForm.valid) {
      return;
    }

    this.editMode
      ? this.store.dispatch(new UpdateRecipe({index: this.selectedRecipeId, updatedRecipe: this.recipeForm.value}))
      : this.store.dispatch(new AddRecipe(this.recipeForm.value));

    this.router.navigateByUrl(`/recipes`);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  addNewIngredient() {
    this.ingredients.push(this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
    }));
  }

  onDeleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  private fillFormWithSelectedRecipe() {
    this.recipeForm.patchValue({
      name: this.recipe.name,
      imagePath: this.recipe.imagePath,
      description: this.recipe.description
    });

    this.recipe.ingredients.forEach(ingredient => {
      this.ingredients.push(this.fb.group({
        name: [ingredient.name, [Validators.required]],
        amount: [ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
      }));
    });
  }
}
