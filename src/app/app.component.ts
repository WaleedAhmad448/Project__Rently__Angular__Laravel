import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { DataserviceServiceService } from './dataservice-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(protected dataserv:DataserviceServiceService,private toastr: ToastrService,protected router:Router) {
  }
  title = 'Rently';
  expression=false
  login=false
  signin=false
  token:any;
  Toke:any
  First_name:any
  user:any
  Last_name:any
  Profile_picturs:any
  ngOnInit() {
    this.LogedIn()
  }
  
   

  LogedIn(){
    if(localStorage.getItem('user')){
      this.login=false
      this.signin=false
      this.expression=true

      this.Toke=localStorage.getItem('user');
      this.token=jwt_decode(this.Toke);
        var $id=this.token.user_id;
        this.dataserv.GetUserInfo($id).subscribe(userinfo =>{
          this.user=userinfo;
          this.First_name=this.user[0].First_name
          this.Last_name=this.user[0].Last_name
          this.Profile_picturs=this.user[0].Profile_picturs
        })
    }else{
      this.login=true
      this.signin=true
      this.expression=false
    }
    
  }
  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/Login']);
  }

}
