import { Component, OnInit, Input} from '@angular/core';
import { trip } from '../extendFiles/modelTrip';
import { TripCardService } from '../extendFiles/trip-card.service';
import { FirebaseService } from '../firebase.service';
import { OpinionService } from '../opinion.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {
  @Input() trip! : trip;
  constructor(private mem: TripCardService, private opinionService: OpinionService,private firebase: FirebaseService,public us:UserService) { }
  public opinionCounter=0;
  public opinionSum=0;
  flagcomment=false;
  flagstars=false;
  war=0;
  counter=0;
  opinionTable: opinion[] = []
  ngOnInit(): void {
    this.opinionCounter=this.trip.numberOfRating;
    this.opinionSum=this.trip.rating;
    if(this.trip.numberOfRating==0){
      this.war=0
    }
    else{
      this.war=Number((Number(this.opinionSum)/ Number(this.opinionCounter)).toFixed(5));
    }
    for(let i=0;i<this.trip.rate.length;i++){
        if(this.trip.rate[i]){
          this.opinionTable.push(this.trip.rate[i])
        }
       
      
      
    }
    this.flagcomment=this.us.canratecomment(this.trip.name);
    this.flagstars=this.us.canratestars(this.trip.name);
    

    

    
   
    
   
  }
  
  function1(){
    this.opinionCounter += 1;
    this.opinionSum+=1;
    this.firebase.changeNumberOfRating(this.trip.name,this.opinionCounter)
    this.firebase.changeRating(this.trip.name,this.opinionSum)
    this.war=Number((this.opinionSum/ this.opinionCounter).toFixed(5));
    this.us.updaterate(this.trip.name);
    this.flagstars=false;
 


    
  
  }
  function2(){
    

    this.opinionCounter += 1;
    this.opinionSum+=2;
    this.firebase.changeNumberOfRating(this.trip.name,this.opinionCounter)
    this.firebase.changeRating(this.trip.name,this.opinionSum)
    this.war=Number((this.opinionSum/ this.opinionCounter).toFixed(5));
    this.us.updaterate(this.trip.name);
    this.flagstars=false;
    console.log(this.opinionCounter)
    console.log(this.war)
   
  }
  function3(){
    this.opinionCounter += 1;
    this.opinionSum+=3;
    this.firebase.changeNumberOfRating(this.trip.name,this.opinionCounter)
    this.firebase.changeRating(this.trip.name,this.opinionSum)
    this.war=Number((this.opinionSum/ this.opinionCounter).toFixed(5));
    this.us.updaterate(this.trip.name);
    this.flagstars=false;
    
  }
  function4(){
    this.opinionCounter += 1;
    this.opinionSum+=4;
    this.firebase.changeNumberOfRating(this.trip.name,this.opinionCounter)
    this.firebase.changeRating(this.trip.name,this.opinionSum)
    this.war=Number((this.opinionSum/ this.opinionCounter).toFixed(5));
    this.us.updaterate(this.trip.name);
    this.flagstars=false;
  }
  function5(){
    this.opinionCounter += 1;
    this.opinionSum+=5;
    this.firebase.changeNumberOfRating(this.trip.name,this.opinionCounter)
    this.firebase.changeRating(this.trip.name,this.opinionSum)
    this.war=Number((this.opinionSum/ this.opinionCounter).toFixed(5));
    this.us.updaterate(this.trip.name);
    this.flagstars=false;
   
  }
 
  updateOpinion(opinionObject: opinion): void{
    this.opinionTable.push(opinionObject);
    this.firebase.addNewRate(this.trip.name,this.opinionTable)
  }
  
 
}

interface opinion {
  nick: string;
  date: string;
  opinia: string;
  opinionname:string;
}
