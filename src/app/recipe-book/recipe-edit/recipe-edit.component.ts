import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  index:number;
  editMode:boolean;
  recipeForm: FormGroup
  recipe:Recipe;
  constructor(private route: ActivatedRoute,private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['id'];
        this.editMode = params['id']!=null;
    });
    if(this.editMode){
      this.recipe = this.getRecipe();
      let recipeIngredients = new FormArray([]);
      if(this.recipe.ingredients){
        this.recipe.ingredients.forEach(ingredient => {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, [Validators.required]),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
        });
      }
      else{
        recipeIngredients = new FormArray([new FormControl({'name': '', 'amount':''})]);
      }
      this.recipeForm = new FormGroup({
        'name': new FormControl(this.recipe.name, [Validators.required]),
        'description': new FormControl(this.recipe.description, [Validators.required]),
        'imagePath': new FormControl(this.recipe.imagePath),
        'ingredients': recipeIngredients
      });
    }
    else{ 
      this.recipeForm = new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'description': new FormControl(null, [Validators.required]),
        'imagePath': new FormControl(null),
        'ingredients': new FormArray([])
      });
    }
  }

  getRecipe(){
    return this.recipeService.getRecipeById(this.index);
  }

  onSubmit(){
    if(this.editMode){
      //TODO don't accept empty fields
      this.recipeService.editRecipe({recipe: new Recipe(this.recipeForm.value.name,
                                                      this.recipeForm.value.description,
                                                      this.recipeForm.value.imagePath,
                                                      this.recipeForm.value.ingredients), index:this.index});
      this.router.navigate(['recipes', this.index]);
    }
    else{
      this.recipeService.addNewRecipe(new Recipe(this.recipeForm.value.name,
                                                 this.recipeForm.value.description,
                                                 this.recipeForm.value.imagePath, []));
    }
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['recipes']);
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
                                      new FormGroup({
                                        'name': new FormControl(null),
                                        'amount': new FormControl(null, [
                                          Validators.required,
                                          Validators.pattern(/^[1-9]+[0-9]*$/)
                                        ])
                                      }));
  }

  //TODO delete all ingredients
  onDeleteAll(){
    (<FormArray>this.recipeForm.get('ingredients')).clear();
  }
}
