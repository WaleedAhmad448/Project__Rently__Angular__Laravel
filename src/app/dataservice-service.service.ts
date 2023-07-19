import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import Echo from 'laravel-echo';
@Injectable({
  providedIn: 'root'
})
export class DataserviceServiceService {

  constructor(public http:HttpClient) { }
  url:string = 'http://localhost:8000/api';

  public Registeruser($data:any){
    return this.http.post(this.url+'/Register',$data);
  }
  public Loginruser($data:any){
    return this.http.post(this.url+'/Login',$data);
  }

  public CreateProperty($data:any){
    return this.http.post(this.url+'/createRent',$data);
  }
  public UpdateProperty($data:any,$id:any){
    return this.http.post(this.url+'/updateRent/'+$id,$data);
  }
  public AddtoyourFavourit($data:any){
    return this.http.post(this.url+'/Favourite',$data);
  }
  public EmailsSend($data:any){
    return this.http.post(this.url+'/messages',$data);
  }
  public UserProfile($data:any,$id:any){
    return this.http.post(this.url+'/UserUpdate/'+$id,$data);
  }
  public Delete($id:any){
    return this.http.get<any>(this.url+'/Delete/'+$id);
  }
  listPerporty(){
    return this.http.get<any>(this.url+'/GetAll');
  }
  UserFavouritList(id:any){
    return this.http.get<any>(this.url+'/YourFavourite/'+id);
  }
  MyPerporty(id:any){
    return this.http.get<any>(this.url+'/MyCreated/'+id);
  }
  MyFavouritPerporty(id:any){
    return this.http.get<any>(this.url+'/MyCreated/'+id);
  }
  PerprotyDetails($id:any){
    return this.http.get<any>(this.url+'/GetDetails/'+$id);
  }
  GetUserInfo($id:any){
    return this.http.get<any>(this.url+'/userinfo/'+$id);
  }
  GetUserPostsandfavourit($id:any){
    return this.http.get<any>(this.url+'/usernumbers/'+$id);
  }
  TokenValidation($data:any){
    return this.http.post(this.url+'/TokenTest/',$data);
  }
  Search($data:any){
    return this.http.post(this.url+'/Search/',$data);
  }
  sharedVariable: any;

  updateSharedVariable(newValue: any) {
    this.sharedVariable = newValue;
  }

  

  

  
}
