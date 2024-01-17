import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing-module'; 
import { UserListComponent } from '../components/user-list/user-list.component';
import { UserDetailsComponent } from '../components/user-details/user-details.component';
import { ReturnButtonComponent } from '../components/return-button/return-button.component';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ 
    AppComponent,
    UserListComponent,
    UserDetailsComponent,
    ReturnButtonComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
