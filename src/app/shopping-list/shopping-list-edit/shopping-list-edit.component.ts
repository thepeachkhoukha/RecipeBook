import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { shoppingListService } from '../shoppingList.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f',{static: false}) ingredientForm;
  editMode:boolean = false;
  index:number;
  subscription: Subscription;
  constructor(private slService: shoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.ingredientEdit.subscribe(
      (data:{ingredient: Ingredient, index:number}) =>{
          this.ingredientForm.setValue({
            name: data.ingredient.name,
            amount: data.ingredient.amount  
          });
          this.index = data.index;
          this.editMode = true;
      }
    )
    
  }
  onAddIngredient(){
    
    if(!this.editMode){
      this.slService.addItem(new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount));
      this.ingredientForm.reset();
    }
    else{
      this.slService.editItem({ingredient: new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount), index: this.index});
      this.onClear();
    }
    this.editMode = false;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onDelete(){
    this.slService.deleteItem(this.index);
    this.onClear();
    this.editMode=false;
  }

  onClear(){
    this.ingredientForm.reset();
  }

}
