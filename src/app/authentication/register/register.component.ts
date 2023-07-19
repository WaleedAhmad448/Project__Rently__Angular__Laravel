import { Component } from '@angular/core';
import { DataserviceServiceService } from 'src/app/dataservice-service.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(protected router:Router,protected dataserv: DataserviceServiceService,private toastr: ToastrService){
  }
  ngOnInit() {
    
  }
  data: any;
  user:any;
  submit(nameuser:string,emailuser:string,passuser:string,passuserConfirm:string,Last_name:string){
    if(passuserConfirm!==passuser){
      this.toastr.info('Passwords do not match');
    }if(nameuser=="" || emailuser=="" || passuser=="" || passuserConfirm==""  || Last_name==""){
      this.toastr.info('please enter all information');
    }else{
      this.user={
        'First_name':nameuser,
        'Last_name':Last_name,
        'email':emailuser,
        'password':passuser
      };
      console.log(this.user);
      this.dataserv.Registeruser(this.user).subscribe(res => {
        this.data=res;
        if(res===0){
          this.toastr.error('Emaile already registered');

        }else{
          this.toastr.success('Register successfully');
          this.router.navigate(['/Login']);
        }
        
  
      })
    }
    
  }
}
