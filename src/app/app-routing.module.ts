import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBundleComponent } from './my-bundle/my-bundle.component';
import { VpnComponent } from './vpn/vpn.component';
import { ReferralComponent } from './referral/referral.component';
import { CountryOverviewComponent } from './country-overview/country-overview.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { DataPlansComponent } from './data-plans/data-plans.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login', component:LoginComponent},
  {path:'my-account', component:MyAccountComponent},
  {path:'data-plans', component:DataPlansComponent},
  {path:'my-bundle', component:MyBundleComponent},
  {path:'vpn', component:VpnComponent},
  {path:'refer', component:ReferralComponent},
  {path:'countries', component:CountryOverviewComponent},
  {
    path: 'payment',
    component: PaymentComponent,
    data: { customData: null }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
