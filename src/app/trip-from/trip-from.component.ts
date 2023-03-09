import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder  } from '@angular/forms';
import { Validators } from '@angular/forms';
import {  Subscription } from 'rxjs';
import { trip } from '../extendFiles/modelTrip';
import { TripCardService } from '../extendFiles/trip-card.service';
import { FirebaseService } from '../firebase.service';
@Component({
  selector: 'app-trip-from',
  templateUrl: './trip-from.component.html',
  styleUrls: ['./trip-from.component.css']
})
export class TripFromComponent implements OnInit {

  constructor(private mem: TripCardService, private firebase: FirebaseService) { }
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
    
  }
  usun(tripObject: trip){
    for (var i = 0; i < this.tablicaSerwe.length; i++) {
      if (this.tablicaSerwe[i] == tripObject) {
        this.tablicaSerwe.splice(i, 1)
        
      }
    }
    this.firebase.removeTrip(tripObject)

  }
  changeForm = new FormGroup({
    price: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]*'),
    
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    max: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]*'),
     
      
    ]),
  });




  ilosc:number = 0;
  TripForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    startDate: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-3][0-9].[0-3][0-9].([0-9][0-9])[0-9][0-9]'),
     
      
    ]),
    endDate: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-3][0-9].[0-3][0-9].([0-9][0-9])[0-9][0-9]'),
    ]),
    max: new FormControl(this.ilosc, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]*'),
    ]),
    price: new FormControl(this.ilosc,[
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]*'),
  
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    linkphoto: new FormControl([], [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

 
  flag=false;
  submit() :void{
    if (!this.TripForm.valid) {
      this.flag=true;
      return
    }

    this.flag=false;
    let AddTrip= {
      name: this.TripForm.get('name')!.value,
      country: this.TripForm.get('country')!.value,
      startDate: this.TripForm.get('startDate')!.value,
      endDate: this.TripForm.get('endDate')!.value,
      description: this.TripForm.get('description')!.value,
      image: this.TripForm.get('image')!.value,
      linkphoto: this.TripForm.get('linkphoto')!.value,
      max: this.TripForm.get('max')!.value,
      price: this.TripForm.get('price')!.value,
      numberOfRating: 0,
      rating:0,
      rate:[],
      


    } as trip
    this.TripForm.reset();
    this.firebase.addTrip(AddTrip);
    
    
    


  }
  submit2(TripObject: trip){
    if(this.changeForm.get('max')!.value!=0){
      let x: any = null;
      x=this.changeForm.get('max')!.value
      this.firebase.changeMax(TripObject.name,x)
    }
    if(this.changeForm.get('price')!.value!=0){
      let x: any = null;
      x=this.changeForm.get('price')!.value
      this.firebase.changePrice(TripObject.name,x)
    }
    if(this.changeForm.get('description')!.value!=""){
      let x: any = null;
      x=this.changeForm.get('description')!.value
      this.firebase.changeDescription(TripObject.name,x)
    }
    this.changeForm.reset();
    

  }

}
