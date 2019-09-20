import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipeSelected:Recipe;
  id:number
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.id= +this.route.snapshot.params['id'];
    this.recipeSelected = this.recipeService.getRecipeById(this.id);
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeSelected = this.recipeService.getRecipeById(this.id);
      }
    )
  }

  toShoppingList(){
    this.recipeService.sendToShoppingList(this.recipeSelected.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
