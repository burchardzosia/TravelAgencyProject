
import { trip } from '../extendFiles/modelTrip';
import { Component, OnInit , Input,ViewChild,Output, EventEmitter} from '@angular/core';
import { TripCardService } from '../extendFiles/trip-card.service';
import { TripServiceService } from '../extendFiles/trip-service.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { max, Observable, Subscription } from 'rxjs';
import { query } from '@angular/animations';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-trip-container',
  templateUrl: './trip-container.component.html',
  styleUrls: ['./trip-container.component.css']
 
})

export class TripContainerComponent implements OnInit {
  
  public counter:number=0;
  tripTable: trip[] =[]
  tripAddCart: trip[] =[]
  public licz:number = 0;
  public mini: number=-1;
  public maxi: number=-1;
  public flag=false;
  constructor(private mem: TripCardService, private firebase:FirebaseService){ 
  }  
  tripsSubsription: Subscription | undefined
  tablicaSerwe: any[] = []
  ngOnInit(): void {
    this.tripsSubsription= this.firebase.getTrips().subscribe(change => {
      this.tablicaSerwe = []
      for (let trip of change){
        this.tablicaSerwe.push({
          country: trip.country,
          name: trip.name,
          description: trip.description,
          endDate: trip.endDate,
          image: trip.image,
          linkphoto: trip.linkphoto,
          max: trip.max,
          price: trip.price,
          startDate: trip.startDate,
          rating: trip.rating,
          numberOfRating: trip.numberOfRating,
          rate:trip.rate,




        }as trip)

      }
      
      
      })
      this.heigh();
      this.mini=-1;
      this.low();
      this.maxi=-1;  
}


  low():number{
    this.mini=-1;
    for (let trip of this.tablicaSerwe){
      if(this.mini > Number(trip.price) || this.mini == -1)
        this.mini = Number(trip.price);
    }
   
    return this.mini;
   
    
  }
  heigh():number{
    this.maxi=-1;
    for (let trip of this.tablicaSerwe){
      if(this.maxi < Number(trip.price) ){
        this.maxi = Number(trip.price);
      }
        
    }

    return this.maxi;
   
    
  }
  plus(tripObject:trip):void{
    this.licz++;
  }
  getback(tripObject:trip):void{
    this.licz--;
   
    
  }
  delatetrip(tripObject : trip):void{

    for (var i = 0; i < this.tablicaSerwe.length; i++) {
      if (this.tablicaSerwe[i] == tripObject) {
        this.tablicaSerwe.splice(i, 1)
        
      }
    }
    this.low();
    this.heigh();
    this.firebase.removeTrip(tripObject)
  }
  submitEvent(trips: trip):void{
    this.tablicaSerwe.push(trips);
    this.low();
    this.heigh();
  }
  

 
}




