import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../recipe-book/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {  
  constructor(private recipesService: RecipeService) { }

  ngOnInit() {
  }
  onSaveData(){
    this.recipesService.saveData().subscribe();
  }

  onFetchData(){
    this.recipesService.fetchData();
  }
  
}
