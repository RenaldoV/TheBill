import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth.service";
import {MatButtonModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { WINDOW_PROVIDERS } from "./window.service";
import { RestDashboardComponent } from './rest-dashboard/rest-dashboard.component';
import { NotAuthService } from "./auth/not-auth.service";
import { AuthGuardService } from "./auth/auth-guard.service";

const routes: Routes = [
  {
    path: 'logIn',
    component: LogInComponent,
    canActivate: [NotAuthService]
  }, {
    path: 'restaurant-dashboard',
    component: RestDashboardComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RestDashboardComponent
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    WINDOW_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
