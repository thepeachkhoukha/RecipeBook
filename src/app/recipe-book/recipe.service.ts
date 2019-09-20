import { Recipe } from './recipe.model';
import { Output, EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { shoppingListService } from '../shopping-list/shoppingList.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipeService{

    @Output() recipesUpdated = new Subject<Recipe[]>();
    recipes: Recipe[] = [];
    
    constructor(private slService:shoppingListService, private http: HttpClient){
        this.fetchData();
    }

    getRecipe(){
        return this.recipes.slice();
    }

    sendToShoppingList(ingredients: Ingredient[]){
        ingredients.forEach(ingredient => {
            this.slService.addItem(ingredient);
        });
    }

    getRecipeById(index: number){
        return this.recipes[index];
    }

    editRecipe(data:{recipe:Recipe, index:number}){
        
        this.recipes[data.index]=data.recipe;
        this.recipesUpdated.next(this.recipes.slice());
        console.log(data.recipe.name);
        console.log(this.recipes);
    }

    addNewRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesUpdated.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesUpdated.next(this.recipes.slice());
    }

    fetchData(){
        this.http.get<Recipe[]>('https://ng-complete-guide-7aa0c.firebaseio.com/recipes.json').subscribe(
            (data: Recipe[]) => {
                this.recipes = data,
                this.recipesUpdated.next(this.recipes.slice())
            }
        );
        
    }

    saveData(){
        console.log(this.recipes);
        return this.http.put('https://ng-complete-guide-7aa0c.firebaseio.com/recipes.json', this.recipes);
    }
}