import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { OpinionComponent } from './opinion/opinion.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { TripContainerComponent } from './trip-container/trip-container.component';
import { TripFromComponent } from './trip-from/trip-from.component';
import { NaviagationComponent } from './naviagation/naviagation.component';
import { StartComponent } from './start/start.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { OpinionFormComponent } from './opinion-form/opinion-form.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { BuyCardComponent } from './buy-card/buy-card.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    OpinionComponent,
    TripCardComponent,
    TripContainerComponent,
    TripFromComponent,
    NaviagationComponent,
    StartComponent,
    TripDetailsComponent,
    OpinionFormComponent,
    BuyCardComponent,
    LoginComponent,
    AdminPanelComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
