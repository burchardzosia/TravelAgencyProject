import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { first, Observable, Subscription } from 'rxjs';
import { query } from '@angular/animations';
import { trip } from './extendFiles/modelTrip';
@Injectable({
  providedIn: 'root'
})


export class FirebaseService {
  TripTable: Observable<any[]>; 
 



  constructor(private db: AngularFireDatabase) { 
    this.TripTable = this.db.list('trips/Trips').valueChanges();
   
  
  
  }
  getTrips(): Observable<any[]>{
    return this.TripTable
  }
  addTrip(AddTrip: trip){
    this.db.list('trips/Trips').push({
      country: AddTrip.country,
      description: AddTrip.description,
      endDate:AddTrip.endDate,
      image: AddTrip.image,
      linkphoto: AddTrip.linkphoto,
      max: AddTrip.max,
      name: AddTrip.name,
      startDate: AddTrip.startDate,
      price:AddTrip.price,
      numberOfRating:0,
      rating: 0,
      rate:[0],

      
    })
  }
  removeTrip(Removetrip: trip){
    this.db.list('trips/Trips').snapshotChanges().pipe(first()).subscribe((list:any) =>{
      for(let i of list){
        if(i.payload.val().name==Removetrip.name)
        {
          this.db.list('trips/Trips').remove(i.payload.key)
        }
      }
    } )

  }
  changeDescription(name:string,newValue:string){
    this.db.list('trips/Trips').snapshotChanges().pipe(first()).subscribe((list:any) =>{
      for(let i of list){
        if(i.payload.val().name==name)
        {
          this.db.list('trips/Trips').update(i.payload, {description: newValue})
        }
      }
    } )
  }

  changePrice(name:string,newValue:number){
    this.db.list('trips/Trips').snapshotChanges().pipe(first()).subscribe((list:any) =>{
      for(let i of list){
        if(i.payload.val().name==name)
        {
          this.db.list('trips/trips').update(i.payload, {price: newValue})
        }
      }
    } )
  }
  changeMax(name:string,newValue:number){
    this.db.list('trips/Trips').snapshotChanges().pipe(first()).subscribe((list:any) =>{
      for(let i of list){
        if(i.payload.val().name==name)
        {

          this.db.list('trips/trips').update(i.payload, {max: newValue})
        }
      }
    } )
  }
  changeRating(name:string,newValue:number){
    this.db.list('trips/Trips').snapshotChanges().pipe(first()).subscribe((list:any) =>{
      for(let i of list){
        if(i.payload.val().name==name)
        {

          this.db.list('trips/trips').update(i.payload, {rating: newValue})
        }
      }
    } )
  }
  changeNumberOfRating(name:string,newValue:number){
    this.db.list('trips/Trips').snapshotChanges().pipe(first()).subscribe((list:any) =>{
      for(let i of list){
        if(i.payload.val().name==name)
        {
          this.db.list('trips/trips').update(i.payload, {numberOfRating: newValue})
        }
      }
    } )
  }
  addNewRate(name:string,newValue:opinion[]){
    this.db.list('trips/Trips').snapshotChanges().pipe(first()).subscribe((list:any) =>{
      for(let i of list){
        if(i.payload.val().name==name)
        {
         
          this.db.list('trips/trips').update(i.payload, {rate: newValue})
        }
      }
    } )
  }

  
  
  
  
}
interface opinion {
  nick: string;
  date: string;
  opinia: string;
  opinionname:string;
}
