import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';

import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { RentingListComponent } from './Pages/renting-list/renting-list.component';
import { CrateHouseComponent } from './Pages/crate-house/crate-house.component';
import { PeropertyDetaileComponent } from './Pages/peroperty-detaile/peroperty-detaile.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { AuthGuardService } from './AuthGard/auth.guard.service';

const routes: Routes = [
  {path: 'Register', component:RegisterComponent},
  {path: 'Login', component:LoginComponent},
  {path: 'Explore', component:RentingListComponent},
  {path: 'AddHouse', component:CrateHouseComponent,canActivate:[AuthGuardService]},
  {path: 'profile', component:ProfileComponent,canActivate:[AuthGuardService]},
  {path: '', component:LandingPageComponent},
  {path: 'profile/AddHouse/:Id', component:CrateHouseComponent,canActivate:[AuthGuardService]},
  {path: 'Explore/Property/:Id', component:PeropertyDetaileComponent,canActivate:[AuthGuardService]},
  {path: 'profile/Property/:Id', component:PeropertyDetaileComponent,canActivate:[AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
