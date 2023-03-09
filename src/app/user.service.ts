import { NONE_TYPE, ParseFlags, ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { TitleStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { trip } from './extendFiles/modelTrip';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<User>;
  users: Observable<any[]>;
  userDoc!: AngularFirestoreDocument<User>;
  nick: string = '';
  id: string = '';
  uid: string = '';
  history:historyDate[] = [];
  isLogged = false;
  x: User[] = [];
  persistenceSetting: string = 'local';
  suma:number=0;
  liczba:number=0;
  
 

  constructor(public afs: AngularFirestore,public auth: AngularFireAuth) {
    
    this.userCollection = this.afs.collection('users');
    this.users = this.afs.collection('users').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.users.subscribe(items => {
      this.x = items;
      this.auth.authState.subscribe(res => {
        this.x.forEach(element=>{
          if(element.mail==res?.email){
            this.id=element.mail;
            let pom = element.mail;

              for(let i=0; i<pom.length; i++){
                if(pom[i] === '@')
                  this.nick = pom.slice(0, i);
              }
              this.suma=0;
              this.liczba=0;
              for(let i=0;i<element.cart.length;i++){
                this.suma=(element.cart[i].trip.price*element.cart[i].number)+this.suma;
                console.log(this.liczba)
                this.liczba+=element.cart[i].number;  
              }
           

          }
          

        })
         
      });
    })
  
  

}
 
  addUser(user: User){
    this.userCollection.add(user);
  }
  getTableOfUser(){
    return this.users;
  }
  isAvialiable(mail:string | null, role:string[]):boolean{
    let flag = false;
      this.x.forEach(item => {
        if(item.mail === mail){
          role.forEach(element => {
            if(element === 'admin' && item.admin)
              flag =  true;
            if(element === 'manager' && item.manager)
              flag = true;
            if(element=== 'zalogowany')
              flag = true;
          })
        }
      })
      return flag;
  }
  isAdmin():boolean{
    let flag=false;
    this.x.forEach(item => {
      if(item.mail === this.id && item.admin){
        flag=true;
      }
    })
    return flag

  }
  isAdminforAdmin(mail:string):boolean{
    let flag=false;
    this.x.forEach(item => {
      if(item.mail ===mail  && item.admin){
        flag=true;
      }
    })
    return flag

  }
  ismanagerforAdmin(mail:string):boolean{
    let flag=false;
    this.x.forEach(item => {
      if(item.mail ===mail  && item.manager){
        flag=true;
      }
    })
    return flag

  }
  isManager():boolean{
    let flag=false;
    this.x.forEach(item => {
      if(item.mail === this.id && item.manager){
        flag=true;
      }
    })
    return flag

  }
  updateUser(x:historyDate){
    this.x.forEach(item => {
      if(item.mail=== this.id){
        let y = item;
        y.hist.push(x)
        let data=item.id
        this.userDoc = this.afs.doc(`users/${data}`);
        this.userDoc.update(y); 
      }
    })

    
    
  }
  isbanned():boolean{
    let flag=false
    this.x.forEach(item => {
      if(item.mail=== this.id){
        if(item.isBanned==true){
          flag=true
        }
      }
    })
    return flag

  }
  isbannedforAdmin(name:string):boolean{
    let flag=false
    this.x.forEach(item => {
      if(item.mail=== name){
        if(item.isBanned==true){
          flag=true
        }
      }
    })
    return flag

  }
  banned(x:string){
    this.x.forEach(item => {
      if(item.mail=== x){
        let y = item;
        y.isBanned=true;
        let data=item.id
        this.userDoc = this.afs.doc(`users/${data}`);
        this.userDoc.update(y); 
      }
    })

    
    
  }
  makeAdmin(x:string){
    this.x.forEach(item => {
      if(item.mail=== x){
        let y = item;
        y.admin=true;
        let data=item.id
        this.userDoc = this.afs.doc(`users/${data}`);
        this.userDoc.update(y); 
      }
    })

    
    
  }
  makeManager(x:string){
    this.x.forEach(item => {
      if(item.mail=== x){
        let y = item;
        y.manager=true;
        let data=item.id
        this.userDoc = this.afs.doc(`users/${data}`);
        this.userDoc.update(y); 
      }
    })

    
    
  }

  canratestars(name: string):boolean{
   
   
    let flag=false;
    this.x.forEach(item => {
      if(item.mail=== this.id){
         for(let i=0;i<item.hist.length;i++){
          if(item.hist[i].trip.name==name && item.hist[i].isRate==0  && !this.isManager() && !this.isbanned()){
            
           flag=true;
          }
         } 
      }
  })
  return flag;
}
canratecomment(name:string):boolean{
  if(this.isManager() && !this.isbanned()){
    return true;

  }
  let flag=false;
    this.x.forEach(item => {
      if(item.mail=== this.id){
         for(let i=0;i<item.hist.length;i++){
          if(item.hist[i].trip.name==name && !this.isbanned()){
           flag=true;
          }
         } 
      }
  })
  return flag;
}
updaterate(name:string){
  this.x.forEach(item => {
    if(item.mail=== this.id){
       let y = item;
       let data=item.id
       this.userDoc = this.afs.doc(`users/${data}`);
       for(let i=0;i<item.hist.length;i++){
        if(item.hist[i].trip.name==name) {
          y.hist[i].isRate=1
          this.userDoc.update(y); 


         
       } 
      }
    }
})
}
updatecart(carta:Cartposition){
  let flag=false
  this.x.forEach(item => {
    if(item.mail=== this.id){

      let y = item;
      let data=item.id
      this.userDoc = this.afs.doc(`users/${data}`);
      for(let i=0;i<item.cart.length;i++){
        if(item.cart[i].trip.name==carta.trip.name) {
          y.cart[i].number+=1
          this.userDoc.update(y); 
          flag=true;
       } 
      }
      if(flag==false){
        y.cart.push(carta);
        this.userDoc.update(y); 

      }
     
    }
  })
  
 
  
 
}

removecart(carta:Cartposition){
  this.x.forEach(item => {
    if(item.mail=== this.id){

      let y = item;
      let data=item.id
      this.userDoc = this.afs.doc(`users/${data}`);
      for(let i=0;i<item.cart.length;i++){
        if(item.cart[i].trip.name==carta.trip.name) {
          if(y.cart[i].number>1){
            y.cart[i].number-=1
          }
          else{
            y.cart.splice(i,1);

          }
         
          this.userDoc.update(y);
          
          
       } 
      }
      
     
     
    }
  })
  
 
  
 
}

removecart2(carta:Cartposition){
  let flag=false
  this.x.forEach(item => {
    if(item.mail=== this.id){

      let y = item;
      let data=item.id
      this.userDoc = this.afs.doc(`users/${data}`);
      for(let i=0;i<item.cart.length;i++){
        if(item.cart[i].trip.name==carta.trip.name) {
          y.cart.splice(i,1);
          this.userDoc.update(y); 
          
          
       } 
      }
      
     
     
    }
  })
  
 
  
 
}
getcart():Cartposition[]{
  let koszyk: Cartposition[]=[]
  this.x.forEach(item => {
    if(item.mail=== this.id){
      koszyk= item.cart;
    }
  })
  return koszyk;
  


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
  trip:trip;
  amount:number;
  date:string;
  isRate:number;
}

export interface Cartposition {
  trip: trip;
  number: number;
}
