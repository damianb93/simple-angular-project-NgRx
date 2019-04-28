import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../recipe.model";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../services/recipe.service";
import {combineLatest} from "rxjs";

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


  constructor(private fb: FormBuilder, private recipeService: RecipeService,
              private route: ActivatedRoute, private router: Router) { }

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

      this.recipeForm.patchValue({
        name: this.recipe.name,
        imagePath: this.recipe.imagePath,
        description: this.recipe.description
      });

      this.recipe.ingredients.forEach(ingredient => {
        this.ingredients.push(this.fb.group({
          name: [ingredient.name, [Validators.required]],
          amount: [ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
        }))
      })
    }
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  getFCtrl(fCtrlName: string): AbstractControl {
    return this.recipeForm.get(fCtrlName);
  }

  onSubmit() {
    if (!this.recipeForm.valid) { return ; }

    this.editMode
      ? this.recipeService.updateRecipe(this.selectedRecipeId, this.recipeForm.value)
      : this.selectedRecipeId = this.recipeService.addRecipe(this.recipeForm.value);

    this.router.navigateByUrl(`/recipes/${this.selectedRecipeId}`);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  addNewIngredient() {
    this.ingredients.push(this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
    }))
  }

  onDeleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }
}
