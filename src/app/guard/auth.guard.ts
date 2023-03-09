import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public us:UserService, public auth: AngularFireAuth, public router:Router){
   
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.authState.pipe(
        map(user => {
          if (user === null){
            alert("Proszę o zalogowanie");
            this.router.navigate(['login']);
            return false;
          }
          const RouteTable= route.data['roles'];
          this.us.getTableOfUser().subscribe(() => {
            if (!this.us.isAvialiable(user.email, RouteTable)) {
              alert("nie masz uprawnień")
              this.router.navigate(['login']);
              return false;
            }
          return true;
          })
          return true;
          }
        )
        )
    }
  }
  


export interface User {
  mail: string;
  admin: boolean;
  manager: boolean;
  isBanned: boolean;
  hist: historyDate[];
  cart: [];
  
  
}
export interface historyDate {
  name:string;
  amount:number;
  date:string;
}
