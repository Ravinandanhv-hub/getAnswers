import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr'

declare var webkitSpeechRecognition:any

@Injectable({
  providedIn: 'root'
})
export class SpeechtotextService {

  text='';
  private speech= new BehaviorSubject<string>('')
  speechShare=this.speech.asObservable();
  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  
  tempWords!: string;
 
  constructor(private appService:AppService, private ts:ToastrService) {

   }
 
  init() {
 
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
 
    this.recognition.addEventListener('result', (e:any) => {
      let transcript = e.results[0][0].transcript
      this.tempWords=transcript
      console.log(this.tempWords);
    });
  }
 
  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.ts.info("Speech recognition started")
    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
        this.ts.info("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }
 
  wordConcat() {
    this.text = this.text + ' ' + this.tempWords;
    this.tempWords = '';
    this.getSpeech(this.text);
  }

  getSpeech(text:string){
    this.speech.next(text);
  }
}
