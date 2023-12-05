import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyBundleComponent } from './my-bundle/my-bundle.component';
import { VpnComponent } from './vpn/vpn.component';
import { CountryOverviewComponent } from './country-overview/country-overview.component';
import { ReferralComponent } from './referral/referral.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { DataPlansComponent } from './data-plans/data-plans.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    MyBundleComponent,
    VpnComponent,
    CountryOverviewComponent,
    ReferralComponent,
    MyAccountComponent,
    DataPlansComponent,
    LoginComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
