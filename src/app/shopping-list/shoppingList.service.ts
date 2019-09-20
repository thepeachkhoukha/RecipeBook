import { Ingredient } from '../shared/ingredient.model';
import { Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';


export class shoppingListService{

    @Output() ingredientEdit = new Subject<{ingredient:Ingredient, index:number}>();
    @Output() ingredientAdded = new EventEmitter<Ingredient[]>();
    ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 2)
    ];

    getShoppingList(){
        return this.ingredients.slice()
    }

    addItem(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientAdded.emit(this.ingredients.slice());
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    editItem(data:{ingredient:Ingredient, index:number}){
        this.ingredients[data.index]= data.ingredient;
        this.ingredientAdded.emit(this.ingredients.slice()); 
    }

    deleteItem(index:number){
        this.ingredients.splice(index,1);
        this.ingredientAdded.emit(this.ingredients.slice()); 
    }
}