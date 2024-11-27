import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataserviceServiceService } from 'src/app/dataservice-service.service';
import { jwtDecode } from 'jwt-decode';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(protected functionhome:AppComponent,protected dataserv:DataserviceServiceService,private toastr: ToastrService,protected router:Router) {
  }

  ngOnInit() {
    console.log('user initialized')
    this.functionhome.ngOnInit()
    //this.functionhome.ngOnInit()
    //console.log(this.test())
  }
  
  
}
