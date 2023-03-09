import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { trip } from '../extendFiles/modelTrip';
import { TripServiceService } from '../extendFiles/trip-service.service';
import { TripCardService } from '../extendFiles/trip-card.service';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { FirebaseService } from '../firebase.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(public TripService: TripServiceService,private mem: TripCardService,private datePipe: DatePipe, private firebase: FirebaseService,public us:UserService,) {}
  public cart: Cartposition[] = [];
  sum!:number;
  myDate = new Date();
  ngOnInit(): void {
    this.sum = this.TripService.sum;
    this.cart=this.TripService.getCart();
  }
  buy(cartposition:Cartposition){
    this.TripService.removeCart2(cartposition.trip)
    this.firebase.changeMax(cartposition.trip.name,cartposition.trip.max-cartposition.number);
    formatDate(new Date(), 'yyyy/MM/dd', 'en');
    let myDate = new Date();
    let dataa=myDate.toLocaleDateString()
    let x:historyDate= {trip:cartposition.trip, amount:cartposition.number, date:dataa,isRate: 0};
    this.us.updateUser(x);
    this.us.suma-=(cartposition.trip.price*cartposition.number)
    this.us.liczba-=cartposition.number
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
export interface historyDate {
  trip:trip;
  amount:number;
  date:string;
  isRate:number;
}