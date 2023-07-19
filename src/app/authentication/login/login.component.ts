import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceServiceService } from 'src/app/dataservice-service.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(protected functionhome:AppComponent,protected toastr: ToastrService,protected dataserv: DataserviceServiceService,protected router:Router){
  }
  data:any;
  userr: any;
  loggedIn: any;


  ngOnInit() {

    this.functionhome.ngOnInit()
    
  }
  
  
  
  user:any;
  token:any;
  dor:any;
  
  
  submit(useremail:string,userpass:string){
    if(useremail==""||userpass==""){
      this.toastr.info('Email and Password required')

    }else{
      this.user={
        'email':useremail,
        'password':userpass,
      };
      this.dataserv.Loginruser(this.user).subscribe(res => {
        this.data=res;
        if(this.data.status==1){
          localStorage.setItem('user',this.data.data.token)

          this.toastr.success('Login Successful')
          this.router.navigate(['/Explore']);

        }else{
          this.toastr.warning('Email Or Password Incorrect!')
        }
      })
    }


  }
}
