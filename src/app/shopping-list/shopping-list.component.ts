import { Component, OnInit, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { shoppingListService } from './shoppingList.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  constructor(private slService: shoppingListService) { }
 
  ngOnInit() {
    this.ingredients = this.slService.getShoppingList();
    this.slService.ingredientAdded.subscribe(
      (ingredients: Ingredient[]) => {this.ingredients = ingredients}
    );
  }

  onEditItem(index: number){
    this.slService.ingredientEdit.next({ingredient:this.slService.getIngredient(index), index:index});
  }

}
