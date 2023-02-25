import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'getAnswers';
  question:any;
  chunck:any;
  Answer:string='';
  constructor(private EleRef:ElementRef, private Service:AppService){}
  ngOnInit(){
  }

  getChunck(str:any){
    this.Answer='';
    this.question=str
    this.getAns()
  }

  getAns(){
    this.Service.getAnswer(this.question).subscribe(res=>{
      this.chunck=res
      this.Answer=this.Answer+this.chunck.choices[0].text;
      if(!environment.production){
        console.log(res)
      }
    })
  }
}
