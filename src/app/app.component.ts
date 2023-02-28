import { Component, ElementRef, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'getAnswers';
  @Output() Authorization='';
  constructor(){}

  auth(Auth:string){
    this.Authorization=Auth;
  }
}
