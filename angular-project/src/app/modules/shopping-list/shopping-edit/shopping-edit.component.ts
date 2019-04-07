import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../../core/models/ingredient.model";
import {ShoppingListService} from "../../../core/services/shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  addIngredient() {
    this.slService.addIngredient(new Ingredient(
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value)
    );
  }
}
