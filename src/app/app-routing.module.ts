import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { TripContainerComponent } from './trip-container/trip-container.component';
import {CartComponent} from './cart/cart.component'
import { TripFromComponent } from './trip-from/trip-from.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { BuyCardComponent } from './buy-card/buy-card.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: 'home', component: StartComponent },
  {path: 'trip', component: TripContainerComponent},
  {path: 'cart', component: CartComponent ,data:{roles:['zalogowany']}, canActivate:[AuthGuard]},
  {path: 'form', component: TripFromComponent ,data:{roles:['manager','admin']}, canActivate:[AuthGuard] },
  {path: 'trip/:id', component:TripDetailsComponent },
  {path: 'buycard', component: BuyCardComponent ,data:{roles:['zalogowany']}, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent },
  {path: 'admin', component: AdminPanelComponent, data:{roles:['admin']}, canActivate:[AuthGuard]},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
