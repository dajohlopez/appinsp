import { Component, OnInit, ViewChild } from '@angular/core';

import { Http } from '@angular/http';
import { UrlService } from '../provider/url.service';
import { NavController, LoadingController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { MenuService } from '../provider/menu.service';
import { ILectura } from 'src/shared/interfaces';
import { MapaPage } from '../mapa/mapa.page';

@Component({
  selector: 'app-listalectura',
  templateUrl: './listalectura.page.html',
  styleUrls: ['./listalectura.page.scss'],
})
export class ListalecturaPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  lecturas: ILectura[] = [];
  lecturaItem: ILectura[] = [];
  lecturaItemTodos: ILectura[] = [];
  zonas: any[];
  rutas: any[];
  textoBuscar: string;
  limit: number;
  total: number;
  suma: number;
  fechainicio: Date;
  fechafin: Date;
  estado: number;
  auxiliar = 0;
  zonadm: string;
  libroi: string;
  librof: string
  
  constructor(
    public http: Http,
    public serviceUrl: UrlService,
    public navCtrl: NavController,
    public menuService: MenuService,
    public loading: LoadingController,
    private modalCtrl: ModalController
  ){
    this.menuService.validarSesion();    
   }

  ngOnInit() {
    this.listLecturas();
    this.cargarZonas();
    this.cargarRutas();
  }

  async listLecturas(){
    this.lecturaItemTodos = await this.serviceUrl.getLecturas().toPromise();
  }
  
  async cargarZonas(){
    this.zonas = await this.serviceUrl.getZonas().toPromise();
  }

  async cargarRutas(){
    this.rutas = await this.serviceUrl.getRutaSuministro().toPromise();
  }

  back(){
    this.navCtrl.navigateBack('home');
  }

  getItems(ev: any){
    const texto = ev.target.value;
    if (texto != 0){
      this.lecturaItem = this.lecturaItemTodos.filter((lectura) => {
        return (lectura.suministro.toLowerCase().indexOf(texto.toLowerCase()) > -1);
      });
    } else {
      this.lecturaItem = [];        
    } 
  }

  async loadMap(lat, lng){
    const modal = await this.modalCtrl.create({
      component: MapaPage,
      componentProps: {
        lat: lat,
        lng: lng
      }
    });
    await modal.present();
  }

  cargar(idlectura){
    this.navCtrl.navigateForward('lectura/'+idlectura);
  }

  mensaje(){
    this.serviceUrl.alertas("Realizado", "Este suministro ya fue inspeccionado.");
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.listLecturas();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      console.log(event);
    }, 2000);
  }
  
  loadData(event) {
    setTimeout(() => {
      let bandera = this.auxiliar;
      for ( let i=0; i<100; i++){
        if (this.lecturaItem.length < this.total){
          this.lecturaItem.push(this.lecturas[bandera+i]);
          bandera = bandera+1;
        } else {
          event.target.complete();
          this.infiniteScroll.disabled = true;
          return;
        }
      }
      this.auxiliar = bandera;
      event.target.complete();         
    }, 1000);
  }

  async pendientes(){
    if(this.fechainicio == undefined || this.fechafin == undefined || this.fechainicio == null || this.fechafin == null){
			this.serviceUrl.alertas('Atención', 'Rellene todos los campos!');
		} else {
      this.estado = 0;
      this.lecturas = await this.serviceUrl.getLecturasParams(this.fechainicio, this.fechafin, this.estado)
        .toPromise();

      this.total = this.lecturas.length;
      if (this.total > 100){
        for (let i=0; i<100; i++){
          this.lecturaItem.push(this.lecturas[i]);
        }
        this.auxiliar = 100;
      } else {
        this.lecturaItem = this.lecturas;
      }
    }
  }

  async pend(){
    if(this.zonadm == undefined || this.libroi == undefined || this.librof == undefined || this.zonadm == null || this.libroi == null || this.librof == null){
			this.serviceUrl.alertas('Atención', 'Rellene todos los campos!');
		} else {
      this.lecturas = await this.serviceUrl.getLecturasZonas(this.zonadm, this.libroi, this.librof)
        .toPromise();

      this.total = this.lecturas.length;
      if (this.total > 100){
        for (let i=0; i<100; i++){
          this.lecturaItem.push(this.lecturas[i]);
        }
        this.auxiliar = 100;
      } else {
        this.lecturaItem = this.lecturas;
      }
    }
  }

  async revisados(){
    if(this.fechainicio == undefined || this.fechafin == undefined || this.fechainicio == null || this.fechafin == null){
			this.serviceUrl.alertas('Alerta', 'Rellene todos los campos!');
		} else {
      this.estado = 1;
      this.lecturas = await this.serviceUrl.getLecturasParams(this.fechainicio, this.fechafin, this.estado)
        .toPromise();

      this.total = this.lecturas.length;
      if (this.total > 100){
        for (let i=0; i<100; i++){
          this.lecturaItem.push(this.lecturas[i]);
        }
        this.auxiliar = 100;
      } else {
        this.lecturaItem = this.lecturas;
      }
    }
  }

}
