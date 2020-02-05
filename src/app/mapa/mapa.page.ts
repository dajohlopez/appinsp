import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from "@ionic/angular";

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  @Input() lat;
  @Input() lng;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address:string;
  mapRef: null;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private activeRouter: ActivatedRoute,
    private modalCtrl: ModalController,
    private ldgCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadMap(this.lat, this.lng);
  }

  async loadMap(lat, lng) {
    const loading = await this.ldgCtrl.create();
    loading.present();

    var latitud = parseFloat(lat);
    var longitud = parseFloat(lng);
    const myLatLng = {
      lat: latitud,
      lng: longitud
    };
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.addMarker(myLatLng.lat, myLatLng.lng);
    });
 
  }

  private addMarker(lat: number, lng: number){
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: 'Ubícame'
    }); 
  }

  back(){
    this.modalCtrl.dismiss();
  }

}
