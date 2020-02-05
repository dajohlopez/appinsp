import { Component, OnInit, ViewChild } from '@angular/core';

import { Http } from '@angular/http';
import { UrlService } from '../provider/url.service';
import { NavController, LoadingController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { MenuService } from '../provider/menu.service';
import { IEntrega } from 'src/shared/interfaces';
import { map } from 'rxjs/operators';
import { MapaPage } from '../mapa/mapa.page';

@Component({
  selector: 'app-listaentrega',
  templateUrl: './listaentrega.page.html',
  styleUrls: ['./listaentrega.page.scss'],
})
export class ListaentregaPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  entregas: IEntrega[] = [];
  entregaItem: IEntrega[] = [];
  entregaItemTodos: IEntrega[] = [];
  zonas: any[];
  rutas: any[];
  textoBuscar: string;
  limit: number;
  total: number;
  suma: number;
  fechainicio: Date;
  fechafin: Date;
  estado: number;
  zonadm: string;
  libroi: string;
  librof: string;
  auxiliar = 0;
  
  constructor(
    public http: Http,
    public serviceUrl: UrlService,
    public navCtrl: NavController,
    public menuService: MenuService,
    public loading: LoadingController,
    public modalCtrl: ModalController
  ){
    this.menuService.validarSesion();
   }

  ngOnInit() {
    this.listEntregas();
    this.cargarZonas();
    this.cargarRutas();
  }

  async listEntregas(){
    this.entregaItemTodos = await this.serviceUrl.getEntregas().toPromise();
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

  getItems(ev: any){
    const texto = ev.target.value;
    if (texto != 0){
      this.entregaItem = this.entregaItemTodos.filter((entrega) => {
        return (entrega.suministro.toLowerCase().indexOf(texto.toLowerCase()) > -1);
      });
    } else {
      this.entregaItem = [];        
    }    
  }

  cargar(identrega){
    this.navCtrl.navigateForward('entrega/'+identrega);
  }

  mensaje(){
    this.serviceUrl.alertas("Realizado", "Este suministro ya fue inspeccionado.");
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.listEntregas();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  loadData(event) {
    setTimeout(() => {
      let bandera = this.auxiliar;
      for ( let i=0; i<100; i++){
        if (this.entregaItem.length < this.total){
          this.entregaItem.push(this.entregas[bandera+i]);
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
      this.entregas = await this.serviceUrl.getEntregasParams(this.fechainicio, this.fechafin, this.estado)
        .toPromise();

      this.total = this.entregas.length;
      if (this.total > 100){
        for (let i=0; i<100; i++){
          this.entregaItem.push(this.entregas[i]);
        }
        this.auxiliar = 100;
      } else {
        this.entregaItem = this.entregas;
      }
    }
  }

  async pend(){
    if(this.zonadm == undefined || this.libroi == undefined || this.librof == undefined || this.zonadm == null || this.libroi == null || this.librof == null){
			this.serviceUrl.alertas('Atención', 'Rellene todos los campos!');
		} else {
      this.entregas = await this.serviceUrl.getEntregasZonas(this.zonadm, this.libroi, this.librof)
        .toPromise();

      this.total = this.entregas.length;
      if (this.total > 100){
        for (let i=0; i<100; i++){
          this.entregaItem.push(this.entregas[i]);
        }
        this.auxiliar = 100;
      } else {
        this.entregaItem = this.entregas;
      }
    }
  }

  async revisados(){
    if(this.fechainicio == undefined || this.fechafin == undefined || this.fechainicio == null || this.fechafin == null){
			this.serviceUrl.alertas('Alerta', 'Rellene todos los campos!');
		} else {
      this.estado = 1;
      this.entregas = await this.serviceUrl.getEntregasParams(this.fechainicio, this.fechafin, this.estado)
        .toPromise();

      this.total = this.entregas.length;
      if (this.total > 100){
        for (let i=0; i<100; i++){
          this.entregaItem.push(this.entregas[i]);
        }
        this.auxiliar = 100;
      } else {
        this.entregaItem = this.entregas;
      }
    }
  }

}
