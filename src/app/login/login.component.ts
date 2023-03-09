import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { trip } from '../extendFiles/modelTrip';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mail = '';
  password = '';
  constructor(public us:UserService,public auth: AngularFireAuth) { }
  
  ngOnInit(): void {
  }
  login() {
    this.auth.setPersistence(this.us.persistenceSetting).then((i) => {
      if(this.mail !== '' && this.password !== ''){
        this.auth.signInWithEmailAndPassword(this.mail, this.password).then((user)=>{
          this.us.id = this.mail;
          let nick = this.mail;
          for(let i=0; i<nick.length; i++){
          if(nick[i] === '@')
            this.us.nick = nick.slice(0, i);
          }
          this.mail = '';
          this.password = '';
        
         
  
        }).catch((error)=>{
          this.mail = '';
          this.password = '';
          alert("Błędnie wpisano hasło lub login")
        });
        
        
        
      }
    })
  
      
    
  }
  logout() {
    this.auth.signOut();
    this.us.id = '';
    this.us.nick = '';
  }
  registration() {
    if(this.mail !== '' && this.password.length >= 6){
      this.auth.createUserWithEmailAndPassword(this.mail, this.password).then((user)=>{
        this.us.addUser({
          mail: this.mail, admin: false, manager: false, isBanned: false, hist: [],
          id: '',cart:[],
        });
        this.mail = '';
        this.password = '';

      }).catch((error)=>{
        this.mail = '';
        this.password = '';
        alert("ten e-mail już istnieje")
      });
      
    }
    else{
      alert("Żle wpisane e-mail lub twoje hasło jest za krókie");
    }
  }

}
export interface User {
  mail: string;
  admin: boolean;
  manager: boolean;
  isBanned: boolean;
  hist: historyDate[];
  id: string;
  cart: Cartposition[]
  
  
}
export interface historyDate {
  name:string;
  amount:number;
  date:string;
}
export interface Cartposition {
  trip: trip;
  number: number;
}
