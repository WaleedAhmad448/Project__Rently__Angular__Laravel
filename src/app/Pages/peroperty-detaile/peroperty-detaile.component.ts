import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataserviceServiceService } from 'src/app/dataservice-service.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-peroperty-detaile',
  templateUrl: './peroperty-detaile.component.html',
  styleUrls: ['./peroperty-detaile.component.css']
})
@Injectable()
export class PeropertyDetaileComponent {
  constructor(private route:ActivatedRoute,protected dataserv:DataserviceServiceService,protected toastr: ToastrService,protected router:Router) {

  }
  Ptitle:any;
  Pprice:any;
  Padresse:any;
  Pdescription:any;
  Pstatus:any;
  Ptype:any;
  Prentalperoid:any;
  Pcity:any;
  phonenum:any;

  Latitude:number=5
  Longitude:number=5
  image1:any
  Toke:any=localStorage.getItem('user');
  token:any;
  map!: google.maps.Map;
  marker: any;
  Perporty:any
  sharedVariable: any;
  Message:any
  Objesct:any
  Email:any
  email:any

  ngOnInit() {
    this.GetPerporty()
  }
  
  Location(){
      const mapElement = document.getElementById("map");
      const latitude = Number(this.Latitude);
      const longitude = Number(this.Longitude);
      if (mapElement) {
        this.map = new google.maps.Map(mapElement, {
          center: { lat: latitude , lng: longitude },
          zoom: 14
        });
        this.marker = new google.maps.Marker({
          position: {
            lat: latitude,
            lng: longitude
          },
          map: this.map
        });

      }
  }
  GetPerporty(){
    const routeParams = this.route.snapshot.paramMap;
    this.sharedVariable = Number(routeParams.get('Id'));
    this.dataserv.PerprotyDetails(this.sharedVariable).subscribe(article =>{
      this.Perporty=article;
      console.log(article)
      this.Latitude=this.Perporty[0].latitude
      this.Longitude=this.Perporty[0].longitude
      this.image1=this.Perporty[0].HouseImage1
      this.Email=this.Perporty[0].Emaile
      this.email=this.Perporty[0].Emaile
      this.Ptitle=this.Perporty[0].Titile
      this.Pprice=this.Perporty[0].Price
      this.Padresse=this.Perporty[0].Adresse
      this.Pdescription=this.Perporty[0].Description

      this.Pstatus=this.Perporty[0].Status
      this.Ptype=this.Perporty[0].Type
      this.Prentalperoid=this.Perporty[0].ResntalPeriod
      this.Pcity=this.Perporty[0].City
      this.phonenum=this.Perporty[0].Phone_number
      this.Location()
    })
  }
  AddFavourite(){
    if(localStorage.getItem('user')){
      this.token = jwtDecode(this.Toke);      var user_id=this.token.user_id;
      const formdata=new FormData();


      formdata.append("Perporty_id",this.sharedVariable);
      formdata.append("user_id",user_id);
      this.dataserv.AddtoyourFavourit(formdata).subscribe(article =>{
        
        this.toastr.info('Added to favorites')

      })

    }else{
      this.toastr.info('You need to sign in first')
    }
    

  }
  SendMessage(){
    const formdata=new FormData();


    formdata.append("subject",this.Objesct);
    formdata.append("body",this.Message);
    formdata.append("recipient",this.Email);
    this.dataserv.EmailsSend(formdata).subscribe(article =>{
      this.toastr.success('Message Sent Successfully')
      console.log(article)

    })
    this.Objesct=''
    this.Message=''

  }
  
}
