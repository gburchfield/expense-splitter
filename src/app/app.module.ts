import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { TripListComponent } from './trip-list/trip-list.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TripListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CurrencyMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
