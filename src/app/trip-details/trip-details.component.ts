import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trip } from '../extendFiles/modelTrip';
import { TripServiceService } from 'src/app/extendFiles/trip-service.service';
import { TripCardService } from '../extendFiles/trip-card.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  public price: number = 0;
  public mark: string='$';
  public counter:number = 0;
  public rating: number=0;
  public number_rating: number=0;
  photos: number = 0
  
  public Trip:trip={ name: '',
    country: '',
    startDate: '',
    endDate: '',
    max: 0,
    price: 0,
    description: '',
    image: '',
    linkphoto :[],
    numberOfRating: 0,
    rating: 0,
    rate: [],
    }
    constructor( private route: ActivatedRoute,private TripService: TripServiceService,private mem: TripCardService,private us:UserService) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('id');
    this.mem.getNewTable().forEach((element)=>{
      if(name==element.name){
        this.Trip=element
      }
      this.us.x.forEach(item => {
        if(item.mail=== this.us.id){
          for(let i=0;i<item.cart.length;i++){
            if(item.cart[i].trip.name==this.Trip.name) {
              this.counter=item.cart[i].number
           } 
          }
         
         
        }
      })
    })
    console.log(this.counter)
    this.price=this.Trip.price

   

  }
  RemoveFromCart(){
    if (this.counter>0){
      this.counter--;
      this.TripService.removeCart(this.Trip)
      this.us.suma-=Number(this.Trip.price);
      this.us.liczba-=1
      
    }
    
   
      
  }
  addToCart(){
    
    if (this.counter<this.Trip.max){
      this.counter++;
      let flag=true;
      this.TripService.pushCart(this.Trip)
      this.us.suma+=Number(this.Trip.price);
      this.us.liczba+=1
      
      
      
    

    }

  }
  change(): void{
    if(this.mark === 'zł'){
      this.price = this.Trip.price;
      this.mark = '€';
    
    }
    else{
      this.price = this.Trip.price * 4.51;
      this.mark = 'zł';
    }
    
  }
  
  nextPhoto(){
    if(this.photos == this.Trip.linkphoto.length-1){
      this.photos = 0;

    }
     
    else{
      this.photos+= 1
    }
    
  }
  previousPhoto(){
    if(this.photos>=1)
    this.photos -= 1
  else{
    this.photos = this.Trip.linkphoto.length-1
  }
  }
  

}


  
