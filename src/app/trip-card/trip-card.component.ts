import { Component, OnInit,ViewChild ,Input, Output,EventEmitter} from '@angular/core';
import { trip } from '../extendFiles/modelTrip';
import { TripServiceService } from 'src/app/extendFiles/trip-service.service';
import { TripCardService } from '../extendFiles/trip-card.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],

})
export class TripCardComponent implements OnInit {
  @Input() trip! : trip;
  @Input() mini! : number;
  @Input() maxi! : number;
  @Output() min = new EventEmitter();
  @Output() max = new EventEmitter();
  @Output() remove : EventEmitter<trip> = new EventEmitter();
  @Output() sub : EventEmitter<trip> = new EventEmitter();
  @Output() getback : EventEmitter<trip> = new EventEmitter();
  public price: number = 0;
  public mark: string='$';
  public counter:number = 0;
  public flag=false;
  public cart:Cartposition[] = [];
  public maxBuy=0;
  information=false;
  constructor(private TripService: TripServiceService,private mem: TripCardService,public us:UserService) {}
  ngOnInit(): void {
    let flag2=true;
    this.maxBuy=this.trip.max;
    this.mem.getNewTable().forEach((element2)=>{
      if(element2.name==this.trip.name){
        flag2=false;
      }

    
    })
    if(flag2){
      this.mem.addingNewCart(this.trip)
    }
    this.cart = this.TripService.getCart();
    this.price=this.trip.price;
    this.us.x.forEach(item => {
      if(item.mail=== this.us.id){
        for(let i=0;i<item.cart.length;i++){
          if(item.cart[i].trip.name==this.trip.name) {
            this.counter=item.cart[i].number
         } 
        }
       
       
      }
    })
    this.information=true;

  
    
    

  }
  change(): void{
    if(this.mark === 'zł'){
      this.price = this.price / 4.51;
      this.mark = '€';
    
    }
    else{
      this.price = this.price * 4.51;
      this.mark = 'zł';
    }
    
  }
  RemoveFromCart(){
    if (this.counter>0){
      this.counter--;
      this.us.suma-=Number(this.trip.price);
      this.us.liczba-=1
      this.getback.emit(this.trip);
      this.TripService.removeCart(this.trip)
      
      
    }
    
   
      
  }
  addToCart(){
    
    if (this.counter<this.maxBuy){
      this.counter++;
      this.us.suma+=Number(this.trip.price);
      this.us.liczba+=1
      this.sub.emit(this.trip);
      this.TripService.pushCart(this.trip)
    }

  }
  getLow(): number{
    this.min.emit();
    return this.mini;
    
  }
  getHeigh(): number{
    this.max.emit();
    return this.maxi;
    
   

  }

 iszalogowany():boolean{
  if(this.us.id!=""){
    return true
  }
  return false;
 }
 
 

}
export interface Cartposition {
  trip: trip;
  number: number;
}