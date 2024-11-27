import { Component } from '@angular/core';
import { google } from 'google-maps';
import { DataserviceServiceService } from 'src/app/dataservice-service.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-crate-house',
  templateUrl: './crate-house.component.html',
  styleUrls: ['./crate-house.component.css']
})
export class CrateHouseComponent {
  constructor(protected dataserv:DataserviceServiceService,protected router:Router,private route:ActivatedRoute,private toastr: ToastrService) {
  }
  Perportytoupdate:any
  Property:any;
  Ptitle:any='';
  Pprice:any=''
  Padresse:any='';
  Pdescription:any='';
  Pstatus:any='';
  Ptype:any='';
  Prentalperoid:any='';
  Pcity:any='';
  email:any='';
  phonenum:any='';
  Latitude:any=0
  Longitude:any=0
  file:any
  Property_id:any;
  addbtn:any
  updatebtn:any
  //Perporty data 
  
  Toke:any=localStorage.getItem('user');
  token:any;
  map!: google.maps.Map;
  marker: any;
  
  
  ngOnInit() {
    this.testtherequist();
    const mapElement = document.getElementById("map");
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, {
        center: { lat: 33.663 , lng: -7.0666 },
        zoom: 8
      });


//     // Add a click event listener to the map
//     this.map.addListener('click', (event: google.maps.MouseEvent) => {
//       console.log('Latitude:', event.latLng.lat());
//       console.log('Longitude:', event.latLng.lng());
//       this.Latitude=event.latLng.lat()
//       this.Longitude=event.latLng.lng()
//       // this.marker = new google.maps.Marker({
//       //   position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
//       //   map: this.map,
//       // });
//       if (this.marker) {
//         this.marker.setMap(null); // Remove existing marker if any
//       }
//       this.marker = new google.maps.Marker({
//         position: {
//           lat: event.latLng.lat(),
//           lng: event.latLng.lng()
//         },
//         map: this.map
//       });
//     });
//   }
// }

  // Add a click event listener to the map
  this.map.addListener('click', (event: google.maps.MapMouseEvent) => {

    if (event.latLng) { // تحقق مما إذا كانت latLng موجودة
        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();

        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);

        this.Latitude = latitude;
        this.Longitude = longitude;

    if (this.marker) {
        this.marker.setMap(null); // Remove existing marker if any
        }
      this.marker = new google.maps.Marker({
          position: {
            lat: latitude,
            lng: longitude
          },
        map: this.map
          });
      } else {
      console.error('LatLng is null');
      }
    });
  }
}

  testtherequist(){
    const routeParams = this.route.snapshot.paramMap;
    this.Property_id = Number(routeParams.get('Id'));
    if(this.Property_id==0){
      this.addbtn=true
      this.updatebtn=false
    }else{
      this.addbtn=false
      this.updatebtn=true
      this.dataserv.PerprotyDetails(this.Property_id).subscribe(article =>{
        this.Perportytoupdate=article;
        this.Ptitle=this.Perportytoupdate[0].Titile
        this.Pprice=this.Perportytoupdate[0].Price
        this.Padresse=this.Perportytoupdate[0].Adresse
        this.Pdescription=this.Perportytoupdate[0].Description
        this.Pstatus=this.Perportytoupdate[0].Status
        this.Ptype=this.Perportytoupdate[0].Type
        this.Prentalperoid=this.Perportytoupdate[0].ResntalPeriod
        this.Pcity=this.Perportytoupdate[0].City
        this.email=this.Perportytoupdate[0].Emaile
        this.phonenum=this.Perportytoupdate[0].Phone_number
        this.marker = new google.maps.Marker({
          position: {
            lat: Number(this.Perportytoupdate[0].latitude),
            lng: Number(this.Perportytoupdate[0].longitude)
          },
          map: this.map
        });
      })

    }
  }
  UpdatePerporty(){
    this.token = jwtDecode(this.Toke);    
    var $id=this.token.user_id;
    const formdata=new FormData();


    //formdata.append("HouseImage1",this.file,this.file.name);
    formdata.append("Titile",this.Ptitle);
    formdata.append("Price",this.Pprice);
    formdata.append("City",this.Pcity);
    formdata.append("Adresse",this.Padresse);
    formdata.append("Emaile",this.email);
    formdata.append("Phone_number",this.phonenum);
    formdata.append("Description",this.Pdescription);
    formdata.append("Status",this.Pstatus);
    formdata.append("Type",this.Ptype);
    formdata.append("ResntalPeriod",this.Prentalperoid);
    formdata.append("latitude",this.Latitude);
    formdata.append("longitude",this.Longitude);
    formdata.append("user_id",this.token.user_id);
    formdata.append("id",this.Property_id);


    this.dataserv.UpdateProperty(formdata,this.Property_id).subscribe(res=>{
      this.Property=res;
      console.log(this.Property);
      this.toastr.success('Property Updated successfully');

      
    })
  }
  uploadimg(event:any){
    this.file = event.target.files[0];
    console.log(this.file);
  }
  AddProperty(){
    if(this.Ptitle=='' || this.Pprice=='' ||this.Pcity=='' ||this.Padresse=='' ||this.email=='' ||this.phonenum=='' ||
    this.Pdescription=='' ||this.Pstatus=='' ||this.Ptype=='' ||this.file==null){
      this.toastr.info('Please enter all informations'); 

    }else if(this.Latitude==0 && this.Longitude==0){
      this.toastr.info('Please Enter Propertie Location');
    }else{
    this.token = jwtDecode(this.Toke);    
    const formdata=new FormData();


    formdata.append("HouseImage1",this.file,this.file.name);
    formdata.append("Titile",this.Ptitle);
    formdata.append("Price",this.Pprice);
    formdata.append("City",this.Pcity);
    formdata.append("Adresse",this.Padresse);
    formdata.append("Emaile",this.email);
    formdata.append("Phone_number",this.phonenum);
    formdata.append("Description",this.Pdescription);
    formdata.append("Status",this.Pstatus);
    formdata.append("Type",this.Ptype);
    formdata.append("ResntalPeriod",this.Prentalperoid);
    formdata.append("latitude",this.Latitude);
    formdata.append("longitude",this.Longitude);
    formdata.append("user_id",this.token.user_id);


    this.dataserv.CreateProperty(formdata).subscribe(res=>{
      this.Property=res;
      console.log(this.Property);
      this.toastr.success('Property added successfully'); 
      this.router.navigate(['/profile']);;

    })
    }
    
    
  }
}
