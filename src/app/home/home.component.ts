import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeechtotextService } from './speechtotext.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  @Input() Authorization!: string;
  chunck:any;
  Answer:string='';
  form:FormGroup;
  loading:boolean=false;
  speech='';
  constructor(public service : SpeechtotextService, private Service:AppService,
    private fb:FormBuilder,private toastr: ToastrService)
  {
    this.service.init()
    this.form=this.fb.group({
      question: ['']
    })
    this.service.init()
  }
  ngOnInit(){
    this.service.speechShare.subscribe(x=>{
      if(!(x==' undefined')){
        this.form.patchValue({question:x})
        console.log("ex")
      }
      if(x=='undefined'){
        console.log("yes")
      }
    });
  }

  getAns(){
    this.loading=true;
    this.Service.getAnswer(this.form.value.question,this.Authorization).subscribe(res=>{
      this.chunck=res
      this.loading=false;
      this.Answer=this.chunck.choices[0].text;
      if(!environment.production){
        console.log(res)
      }
    },err=>{
      this.loading=false;
      this.toastr.success(err.statusText+' Please try again')
    })
  }

  startService(){
    this.service.start()
  }
 
  stopService(){
    this.service.stop()
  }
}
