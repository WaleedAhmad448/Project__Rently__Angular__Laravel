import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataserviceServiceService } from 'src/app/dataservice-service.service';
import { PeropertyDetaileComponent } from '../peroperty-detaile/peroperty-detaile.component';
import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-renting-list',
  templateUrl: './renting-list.component.html',
  styleUrls: ['./renting-list.component.css']
})
export class RentingListComponent {

  constructor(protected functionhome:AppComponent,protected ff:PeropertyDetaileComponent,protected dataserv:DataserviceServiceService,protected toastr: ToastrService,protected router:Router) {
  }
  p: number = 1;
  Perporty:any
  Ptype=''
  Pville=''
  Pstatus=''
  Pdate='asc'
  Favouritr:any
  Toke:any=localStorage.getItem('user');
  token:any;
  ngOnInit(): void {
    this.functionhome.ngOnInit()
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.GetAll();
  }
  
  GetAll(){
    this.dataserv.listPerporty().subscribe(article =>{
      this.Perporty=article;
      console.log(this.Perporty)
    })
  }
  AddFavourite(id_property:any){
    if(localStorage.getItem('user')){
      this.token = jwtDecode(this.Toke);        var user_id=this.token.user_id;
        const formdata=new FormData();


        formdata.append("Perporty_id",id_property);
        formdata.append("user_id",user_id);
        this.dataserv.AddtoyourFavourit(formdata).subscribe(article =>{
          this.Favouritr=article;
          console.log(this.Favouritr)
          this.toastr.info('Added to favorites')

        })
    }else{
      this.toastr.info('You need to sign in first')

    }
  }
  search(){
    const formData = new FormData();

    if (this.Pdate === 'New to Old') {
      this.Pdate = 'desc';
    } else if (this.Pdate === 'Old to New') {
      this.Pdate = 'asc';
    } else {
      this.Pdate = 'desc';
    }

    if (this.Ptype !== '') {
      formData.append("Type", this.Ptype);
    }
    if (this.Pstatus !== '') {
      formData.append("Status", this.Pstatus);
    }
    if (this.Pville !== '') {
      formData.append("City", this.Pville);
    }
    
    formData.append("SortByDate", this.Pdate);
    console.log(this.Pdate);

    this.dataserv.Search(formData).subscribe(article => {
      this.Perporty = article;
    });
    formData.delete
    this.Ptype=''
    this.Pville=''
    this.Pstatus=''
    this.Pdate='asc'
  }
  
  
}
