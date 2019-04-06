import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Array<Recipe> = [
    new Recipe('Test', 'test description', 'https://c.pxhere.com/photos/8b/0f/' +
      'food_meat_recipe_power_pork_dishes-604134.jpg!d'),
    new Recipe('Test', 'test description', 'https://c.pxhere.com/photos/8b/0f/' +
      'food_meat_recipe_power_pork_dishes-604134.jpg!d'),
    new Recipe('Test', 'test description', 'https://c.pxhere.com/photos/8b/0f/' +
      'food_meat_recipe_power_pork_dishes-604134.jpg!d')
  ];

  constructor() { }

  ngOnInit() {
  }

}
