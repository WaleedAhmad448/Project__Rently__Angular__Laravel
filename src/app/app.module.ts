import {  NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { RentingListComponent } from './Pages/renting-list/renting-list.component';
import { CrateHouseComponent } from './Pages/crate-house/crate-house.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {  ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { PeropertyDetaileComponent } from './Pages/peroperty-detaile/peroperty-detaile.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { ProfileComponent } from './Pages/profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    PeropertyDetaileComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    RentingListComponent,
    CrateHouseComponent,
    ProfileComponent,
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastNoAnimationModule.forRoot(),
    ToastNoAnimation
  ],
  providers: [PeropertyDetaileComponent,{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '802651425260-1l7rb297u2okomuqb368g7l71r3sbmsv.apps.googleusercontent.com'
          )
        }
      ],
      onError: (err: any) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
