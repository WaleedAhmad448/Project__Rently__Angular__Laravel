import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth.service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private Auth: AuthServiceService,private router:Router){}
  canActivate(): boolean{
    if(this.Auth.IslogedIn()==true){
    return true;
    }else{

      this.router.navigate(['/Login']);
      return false;
    }
  }
}
