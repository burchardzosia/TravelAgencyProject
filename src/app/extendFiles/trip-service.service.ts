import { Injectable, Output ,EventEmitter} from '@angular/core';
import {trip } from "../extendFiles/modelTrip"
import { UserService } from '../user.service';
@Injectable({
  providedIn: 'root'
})
export class TripServiceService {
  cart: Cartposition[] = [];
  sum: number = 0;
  liczba:number=0;
  public flag=true;
  public flag2=false;
  constructor(public us:UserService) { 
  }
  
  getCart(): Cartposition[]{
    return this.us.getcart();
    
  }
  pushCart(Object: trip){
    let x:Cartposition = {trip: Object, number: 1} 
    this.us.updatecart(x);
    this.cart.push(x)
  }
  removeCart(Object: trip){
    let x:Cartposition = {trip: Object, number: 1} 
    this.us.removecart(x);
  

    
   
  }
  removeCart2(Object: trip){
  let x:Cartposition = {trip: Object, number: 1} 
  this.us.removecart2(x)

  }
  addBuyTrip(TripBuy:TripBuy){
  let dataa=TripBuy.date;
  let day2=Number(dataa[0])
      let month2=Number(dataa[2])*10+Number(dataa[3])
      let year2=Number(dataa[5])*1000+Number(dataa[6])*100+Number(dataa[7])*10+Number(dataa[8])
      if(Number(dataa[1])>0){
        day2=Number(dataa[0])*10+Number(dataa[1])
        month2=Number(dataa[2])*10+Number(dataa[3])
        year2=Number(dataa[5])*1000+Number(dataa[6])*100+Number(dataa[7])*10+Number(dataa[8])
        }
  let day=Number(dataa[0])+3
      let month=Number(dataa[2])*10+Number(dataa[3])
      let year=Number(dataa[5])*1000+Number(dataa[6])*100+Number(dataa[7])*10+Number(dataa[8])
      if(Number(dataa[1])>0){
        day=Number(dataa[0])*10+Number(dataa[1])+3
        month=Number(dataa[2])*10+Number(dataa[3])
        year=Number(dataa[5])*1000+Number(dataa[6])*100+Number(dataa[7])*10+Number(dataa[8])
        }
  let day4=Number(TripBuy.trip.startDate[0])*10+Number(TripBuy.trip.startDate[1])
  let month4=Number(TripBuy.trip.startDate[3])*10+Number(TripBuy.trip.startDate[4])
  let year4=Number(TripBuy.trip.startDate[6])*1000+Number(TripBuy.trip.startDate[7])*100+Number(TripBuy.trip.startDate[8])*10+Number(TripBuy.trip.startDate[9])
  let tripstart3days=year*10000+month*100+day;
  let actualdate=year2*10000+month2*100+day2;
  let tripdatestart=year4*10000+month4*100+day4;
  if (actualdate<tripdatestart && tripstart3days>tripdatestart ){
    this.flag2=true
    
  }
}       
       
}


export interface Cartposition {
  trip: trip;
  number: number;
}
export interface TripBuy {
  trip: trip;
  date: string;
  number:number
}
