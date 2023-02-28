import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  getAnswer(question:string,Auth:string){
    const data={
      "model": "text-davinci-002",
      "prompt": question,
      "max_tokens":2000
    }
    const header=new HttpHeaders({
      'Authorization':'Bearer '+Auth,
      'Content-Type':'application/json'
    })
    return this.http.post('https://api.openai.com/v1/completions',data,{headers: header});
  }
  
}
