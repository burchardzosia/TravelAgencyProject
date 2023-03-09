import { Component, OnInit } from '@angular/core';
import { TripServiceService } from '../extendFiles/trip-service.service';
import { TripCardService } from '../extendFiles/trip-card.service';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-naviagation',
  templateUrl: './naviagation.component.html',
  styleUrls: ['./naviagation.component.css']
})
export class NaviagationComponent implements OnInit {

  constructor(public serviceTrip:TripServiceService,public mem:TripCardService,private datePipe: DatePipe,public us:UserService,public auth: AngularFireAuth,public router: Router) {}
  sum!:number;
  flag=true;
  ngOnInit(): void {
  
  }
  logout() {
    this.auth.signOut();
    this.us.id = '';
    this.us.nick = '';
    this.router.navigate(['login']);
    this.us.suma=0;
    this.us.liczba=0;

  }
  isAdmin(){
    return this.us.isAdmin();
 
  }
  

}


