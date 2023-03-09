import { Component, OnInit } from '@angular/core';
import { trip } from '../extendFiles/modelTrip';
import { TripServiceService } from '../extendFiles/trip-service.service';
import { TripCardService } from '../extendFiles/trip-card.service';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { UserService } from '../user.service';
@Component({
  selector: 'app-buy-card',
  templateUrl: './buy-card.component.html',
  styleUrls: ['./buy-card.component.css']
})
export class BuyCardComponent implements OnInit {

  constructor(public trip:TripServiceService, private datePipe: DatePipe,public us:UserService) { }
  public table:TripBuy[] = [];
  ngOnInit(): void {
    this.us.x.forEach(item => {
      if(item.mail=== this.us.id){
         for(let i=0;i<item.hist.length;i++){
          let element:TripBuy = {trip: item.hist[i].trip,date:item.hist[i].date ,number:item.hist[i].amount} 
          this.table.push(element)
          this.trip.addBuyTrip(element)
          
         } 
        }
      
  })
}

    
  
    
  
  every(){
    this.table=[]
    this.us.x.forEach(item => {
      if(item.mail=== this.us.id){
         for(let i=0;i<item.hist.length;i++){
          let element:TripBuy = {trip: item.hist[i].trip,date:item.hist[i].date ,number:item.hist[i].amount} 
          this.table.push(element)
         } 
        }
      
  })

    

  }
  
  archiwum(){
    this.table=[]
    this.us.x.forEach(item => {
      if(item.mail=== this.us.id){
         for(let i=0;i<item.hist.length;i++){
          let day=Number(item.hist[i].trip.startDate[0])*10+Number(item.hist[i].trip.startDate[1])
          let month=Number(item.hist[i].trip.startDate[3])*10+Number(item.hist[i].trip.startDate[4])
          let year=Number(item.hist[i].trip.startDate[6])*1000+Number(item.hist[i].trip.startDate[7])*100+Number(item.hist[i].trip.startDate[8])*10+Number(item.hist[i].trip.startDate[9])
          let dataa=item.hist[i].date
          let day2=Number(dataa[0])
          let month2=Number(dataa[2])*10+Number(dataa[3])
          let year2=Number(dataa[5])*1000+Number(dataa[6])*100+Number(dataa[7])*10+Number(dataa[8])
          if(Number(dataa[1])>0){
            day2=Number(dataa[0])*10+Number(dataa[1])
            month2=Number(dataa[2])*10+Number(dataa[3])
            year2=Number(dataa[5])*1000+Number(dataa[6])*100+Number(dataa[7])*10+Number(dataa[8])
            }
          let day3=Number(item.hist[i].trip.endDate[0])*10+Number(item.hist[i].trip.endDate[1])
          let month3=Number(item.hist[i].trip.endDate[3])*10+Number(item.hist[i].trip.endDate[4])
          let year3=Number(item.hist[i].trip.endDate[6])*1000+Number(item.hist[i].trip.endDate[7])*100+Number(item.hist[i].trip.endDate[8])*10+Number(item.hist[i].trip.endDate[9])
          let tripdateStart=year*10000+month*100+day;
          let actualdate=year2*10000+month2*100+day2;
          let tripdateEnd=year3*10000+month3*100+day3;
          if (actualdate>tripdateStart && actualdate>tripdateEnd ){
            let element:TripBuy = {trip: item.hist[i].trip,date:item.hist[i].date ,number:item.hist[i].amount} 
            this.table.push(element)
          
          }
          
          
  
  
           
         } 
        }
      
  })
    
        




  }
  
 
  actual(){
    this.table=[]
    this.us.x.forEach(item => {
      if(item.mail=== this.us.id){
         for(let i=0;i<item.hist.length;i++){
          let day=Number(item.hist[i].trip.startDate[0])*10+Number(item.hist[i].trip.startDate[1])
          let month=Number(item.hist[i].trip.startDate[3])*10+Number(item.hist[i].trip.startDate[4])
          let year=Number(item.hist[i].trip.startDate[6])*1000+Number(item.hist[i].trip.startDate[7])*100+Number(item.hist[i].trip.startDate[8])*10+Number(item.hist[i].trip.startDate[9])
          let dataa=item.hist[i].date
          let day2=Number(dataa[0])
          let month2=Number(dataa[2])*10+Number(dataa[3])
          let year2=Number(dataa[5])*1000+Number(dataa[6])*100+Number(dataa[7])*10+Number(dataa[8])
          if(Number(dataa[1])>0){
          day2=Number(dataa[0])*10+Number(dataa[1])
          month2=Number(dataa[2])*10+Number(dataa[3])
          year2=Number(dataa[5])*1000+Number(dataa[6])*100+Number(dataa[7])*10+Number(dataa[8])
          }
          let day3=Number(item.hist[i].trip.endDate[0])*10+Number(item.hist[i].trip.endDate[1])
          let month3=Number(item.hist[i].trip.endDate[3])*10+Number(item.hist[i].trip.endDate[4])
          let year3=Number(item.hist[i].trip.endDate[6])*1000+Number(item.hist[i].trip.endDate[7])*100+Number(item.hist[i].trip.endDate[8])*10+Number(item.hist[i].trip.endDate[9])
          let tripdateStart=year*10000+month*100+day;
          let actualdate=year2*10000+month2*100+day2;
          let tripdateEnd=year3*10000+month3*100+day3;
          if (actualdate>tripdateStart && actualdate<tripdateEnd ){
            let element:TripBuy = {trip: item.hist[i].trip,date:item.hist[i].date ,number:item.hist[i].amount} 
            this.table.push(element)
          
          }
          
          
  
  
           
         } 
        }
        

  })


  }
  future(){
    this.table=[]
    this.us.x.forEach(item => {
      if(item.mail=== this.us.id){
         for(let i=0;i<item.hist.length;i++){
          let day=Number(item.hist[i].trip.startDate[0])*10+Number(item.hist[i].trip.startDate[1])
          let month=Number(item.hist[i].trip.startDate[3])*10+Number(item.hist[i].trip.startDate[4])
          let year=Number(item.hist[i].trip.startDate[6])*1000+Number(item.hist[i].trip.startDate[7])*100+Number(item.hist[i].trip.startDate[8])*10+Number(item.hist[i].trip.startDate[9])
          let dataa=item.hist[i].date
          let day2=Number(dataa[0])
        let month2=Number(dataa[2])*10+Number(dataa[3])
        let year2=Number(dataa[5])*1000+Number(dataa[6])*100+Number(dataa[7])*10+Number(dataa[8])
        if(Number(dataa[1])>0){
        day2=Number(dataa[0])*10+Number(dataa[1])
        month2=Number(dataa[2])*10+Number(dataa[3])
        year2=Number(dataa[5])*1000+Number(dataa[6])*100+Number(dataa[7])*10+Number(dataa[8])
        
        }
          let day3=Number(item.hist[i].trip.endDate[0])*10+Number(item.hist[i].trip.endDate[1])
          let month3=Number(item.hist[i].trip.endDate[3])*10+Number(item.hist[i].trip.endDate[4])
          let year3=Number(item.hist[i].trip.endDate[6])*1000+Number(item.hist[i].trip.endDate[7])*100+Number(item.hist[i].trip.endDate[8])*10+Number(item.hist[i].trip.endDate[9])
          let tripdateStart=year*10000+month*100+day;
          let actualdate=year2*10000+month2*100+day2;
          let tripdateEnd=year3*10000+month3*100+day3;
          if (actualdate<tripdateStart  && actualdate<tripdateEnd){
            let element:TripBuy = {trip: item.hist[i].trip,date:item.hist[i].date ,number:item.hist[i].amount} 
            this.table.push(element)
          
          }
          
          
  
  
           
         } 
        }
        

  })


  }
  
  

}

export interface TripBuy {
  trip: trip;
  date: string;
  number:number
}
