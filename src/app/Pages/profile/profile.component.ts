import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataserviceServiceService } from 'src/app/dataservice-service.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(protected dataserv:DataserviceServiceService,private toastr: ToastrService,protected router:Router) {
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.GetUserInfo()
    this.GetUsernembers()
    this.UserFavourit()
  }
  First_name:any
  Last_name:any
  Address:any
  Gender:any
  Nationality:any
  Profile_picturs:any
  Phone_numer:any
  email:any
  nmbrPosts:any
  nbrFavourit:any

  Toke:any=localStorage.getItem('user');
  token:any;
  user:any
  createdperporty:any=false
  profile:any=true
  Favouritperporty:any=false
  Perporty:any
  favPerporty:any
  uploadimg(event:any){
    this.Profile_picturs = event.target.files[0];
    console.log(this.Profile_picturs);
  }
  ProfileInformation(){
    this.token=jwt_decode(this.Toke);
    var $id=this.token.user_id;
    const formdata=new FormData();

    formdata.append("Profile_picturs",this.Profile_picturs,this.Profile_picturs.name);
    formdata.append("First_name",this.First_name);
    formdata.append("Last_name",this.Last_name);
    formdata.append("Address",this.Address);
    formdata.append("Gender",this.Gender);
    formdata.append("Nationality",this.Nationality);
    formdata.append("Phone_numer",this.Phone_numer);
    formdata.append("email",this.email);
    this.dataserv.UserProfile(formdata,$id).subscribe(response=>{
      console.log(response)
      this.toastr.success('Profile Updated successfully');

    })



  }

  GetUsernembers(){
    this.token=jwt_decode(this.Toke);
    var $id=this.token.user_id;
    this.dataserv.GetUserPostsandfavourit($id).subscribe(article =>{
      this.nbrFavourit=article.nbrFavourite;
      this.nmbrPosts=article.nbrPosts;
    })
  }

  GetAll(){
    this.token=jwt_decode(this.Toke);
    var $id=this.token.user_id;
    this.dataserv.MyPerporty($id).subscribe(article =>{
      this.Perporty=article;
      
    })
  }
  UserFavourit(){
    this.token=jwt_decode(this.Toke);
    var $id=this.token.user_id;
    this.dataserv.UserFavouritList($id).subscribe(article =>{
      this.favPerporty=article;
      console.log(this.favPerporty)
    })
  }
  GetUserInfo(){
    this.token=jwt_decode(this.Toke);
    var $id=this.token.user_id;
    this.dataserv.GetUserInfo($id).subscribe(userinfo =>{
      this.user=userinfo;
      this.First_name=this.user[0].First_name
      this.Last_name=this.user[0].Last_name
      this.Address=this.user[0].Address
      this.Nationality=this.user[0].Nationality
      this.Profile_picturs=this.user[0].Profile_picturs
      this.Phone_numer=this.user[0].Phone_numer
      this.email=this.user[0].email
      this.Gender=this.user[0].Gender
      this.Profile_picturs=this.user[0].Profile_picturs
    })
  }
  Delete(id:any){

    this.dataserv.Delete(id).subscribe(responce =>{
      console.log(responce)

    })
    this.GetAll()
    this.UserFavourit()
    this.GetUsernembers()
  }


  test(Id:any){
    this.dataserv.updateSharedVariable(Id);
    this.router.navigate(['/D']);;
  }


  showPersennelinfo(){
    this.createdperporty=false
    this.profile=true
    this.Favouritperporty=false
  }
  showcreatedperporty(){
    this.createdperporty=true
    this.profile=false
    this.Favouritperporty=false
    this.GetAll()
  }
  showFavouritperporty(){
    this.createdperporty=false
    this.profile=false
    this.Favouritperporty=true
    this.UserFavourit()
  }

}
