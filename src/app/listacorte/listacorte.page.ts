import { Component, OnInit, ViewChild } from '@angular/core';

import { Http } from '@angular/http';
import { UrlService } from '../provider/url.service';
import { NavController, LoadingController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { MenuService } from '../provider/menu.service';
import { ICorte } from 'src/shared/interfaces';
import { MapaPage } from '../mapa/mapa.page';

@Component({
  selector: 'app-listacorte',
  templateUrl: './listacorte.page.html',
  styleUrls: ['./listacorte.page.scss'],
})
export class ListacortePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  cortes: ICorte[] = [];
  corteItem: ICorte[] = [];
  corteItemTodos: ICorte[] = [];
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
  librof: string;
  
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
    this.listCortes();
    this.cargarZonas();
    this.cargarRutas();
  }

  async listCortes(){
    this.corteItemTodos = await this.serviceUrl.getCortes().toPromise();
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
      this.corteItem = this.corteItemTodos.filter((corte) => {
        return (corte.suministro.toLowerCase().indexOf(texto.toLowerCase()) > -1);
      });
    } else {
      this.corteItem = [];        
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
  
  cargar(idcorte){
    this.navCtrl.navigateForward('corte/'+idcorte);
  }

  mensaje(){
    this.serviceUrl.alertas("Realizado", "Este suministro ya fue inspeccionado.");
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.listCortes();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  loadData(event) {
    setTimeout(() => {
      let bandera = this.auxiliar;
      for ( let i=0; i<100; i++){
        if (this.corteItem.length < this.total){
          this.corteItem.push(this.cortes[bandera+i]);
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
      this.cortes = await this.serviceUrl.getCortesParams(this.fechainicio, this.fechafin, this.estado)
        .toPromise();

      this.total = this.cortes.length;
      if (this.total > 100){
        for (let i=0; i<100; i++){
          this.corteItem.push(this.cortes[i]);
        }
        this.auxiliar = 100;
      } else {
        this.corteItem = this.cortes;
      }
    }
  }

  async pend(){
    if(this.zonadm == undefined || this.libroi == undefined || this.librof == undefined || this.zonadm == null || this.libroi == null || this.librof == null){
			this.serviceUrl.alertas('Atención', 'Rellene todos los campos!');
		} else {
      this.cortes = await this.serviceUrl.getCorteZonas(this.zonadm, this.libroi, this.librof)
        .toPromise();

      this.total = this.cortes.length;
      if (this.total > 100){
        for (let i=0; i<100; i++){
          this.corteItem.push(this.cortes[i]);
        }
        this.auxiliar = 100;
      } else {
        this.corteItem = this.cortes;
      }
    }
  }

  async revisados(){
    if(this.fechainicio == undefined || this.fechafin == undefined || this.fechainicio == null || this.fechafin == null){
			this.serviceUrl.alertas('Alerta', 'Rellene todos los campos!');
		} else {
      this.estado = 1;
      this.cortes = await this.serviceUrl.getCortesParams(this.fechainicio, this.fechafin, this.estado)
        .toPromise();

      this.total = this.cortes.length;
      if (this.total > 100){
        for (let i=0; i<100; i++){
          this.corteItem.push(this.cortes[i]);
        }
        this.auxiliar = 100;
      } else {
        this.corteItem = this.cortes;
      }
    }
  }


}
