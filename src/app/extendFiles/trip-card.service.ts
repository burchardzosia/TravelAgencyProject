import { Injectable } from '@angular/core';
import {trip } from "../extendFiles/modelTrip"
import { DatePipe } from '@angular/common'
import { UserService } from '../user.service';
@Injectable({
  providedIn: 'root'
})
export class TripCardService {
  
  memory:Memory[] = [];
  table: trip[]=[]
  tableNew: trip[]=[]
  BuyTrip: TripBuy[]=[]
  timetable: number[]=[]
  flag=true;
  flag2=false
  BuyTrip2:historyDate[]=[]
  constructor(public datepipe: DatePipe, public us:UserService) {

   }
  getBuyTrip2(){
    return this.BuyTrip2;
  }
  getMemory(){
    return this.memory;
  }
  getTable(){
    return this.table
  }
  addTable(tripObject:trip){
    this.table.push(tripObject);

  }
  addingNewCart(tripObject:trip){
    this.tableNew.push(tripObject);


  }
  getNewTable(){
    return this.tableNew;
  }
  
 
  getBuyTrip(){
    return this.BuyTrip;
  }



 
}

export interface Memory {
  name: string;
  number: number;
  rating: number;
  number_rating: number;
  buy:number;
}

export interface TripBuy {
  trip: trip;
  date: string;
  number:number
}
export interface historyDate {
  name:string;
  amount:number;
  date:string;
  isRate:number;
}