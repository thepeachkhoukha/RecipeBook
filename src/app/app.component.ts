import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'udemyClass';
  feature:string = 'recipes';
  onNavigate(feature:string){
    this.feature= feature;
  }
}
