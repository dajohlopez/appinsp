import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { IEntrega, ILectura, ICorte, Izonas, ItLectura, IobsLectura, IRutaSuministro, ICoordenadas } from 'src/shared/interfaces';

import { FileTransfer, FileUploadOptions, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

	url: string = "http://serverapi.facturacionsci.com/";


	loading = false;

  constructor(
		public alert: AlertController,
		public loadingCtrl: LoadingController,
		private http: HttpClient,
		private fileTransfer: FileTransfer
  ) { }

  getUrl(){
  	return this.url;
  }

  getEntregasParams(fechainicio, fechafin, estado){
	return this.http.get<IEntrega[]>(this.getUrl()+"listEntregas.php?fechainicio="+fechainicio+"&fechafin="+fechafin+"&estado="+estado);
  }

  getEntregasZonas(zonadm, libroi, librof){
	return this.http.get<IEntrega[]>(this.getUrl()+"listEntregaZona.php?zonadm="+zonadm+"&libroi="+libroi+"&librof="+librof);
  }

  getLecturasParams(fechainicio, fechafin, estado){
	return this.http.get<ILectura[]>(this.getUrl()+"listLecturas.php?fechainicio="+fechainicio+"&fechafin="+fechafin+"&estado="+estado);
  }

  getLecturasZonas(zonadm, libroi, librof){
	return this.http.get<ILectura[]>(this.getUrl()+"listLecturaZona.php?zonadm="+zonadm+"&libroi="+libroi+"&librof="+librof);
  }

  getCortesParams(fechainicio, fechafin, estado){
	return this.http.get<ICorte[]>(this.getUrl()+"listCortes.php?fechainicio="+fechainicio+"&fechafin="+fechafin+"&estado="+estado);
  }

  getCorteZonas(zonadm, libroi, librof){
	return this.http.get<ICorte[]>(this.getUrl()+"listCorteZona.php?zonadm="+zonadm+"&libroi="+libroi+"&librof="+librof);
  }

  getEntregas(){
	return this.http.get<IEntrega[]>(this.getUrl()+"listTotalEntregas.php");
  }

  getLecturas(){
	return this.http.get<ILectura[]>(this.getUrl()+"listTotalLecturas.php");
  }

  getCortes(){
	return this.http.get<ICorte[]>(this.getUrl()+"listTotalCortes.php");
  }

  getZonas(){
	return this.http.get<Izonas[]>(this.getUrl()+"zonaAdm.php");
  }

  getRutaSuministro(){
	return this.http.get<IRutaSuministro[]>(this.getUrl()+"rutaSuministro.php");
  }

  getTipoLecturas(){
	return this.http.get<ItLectura[]>(this.getUrl()+"listLectura.php");
  }

  getObsLectura(){
	return this.http.get<IobsLectura[]>(this.getUrl()+"obsLectura.php");
  }

  getCoordenadas(suministro){
	return this.http.get<ICoordenadas>(this.getUrl()+"coordenadas.php?suministro="+suministro);
  }

  subirFotoEntrega(img: string){
	const options: FileUploadOptions = {
		fileKey: 'img'
	};
	const fileTransfer: FileTransferObject = this.fileTransfer.create();
	return fileTransfer.upload( img, this.getUrl()+"upload_entrega.php", options);
  }

  subirFotoLectura(img: string){
	const options: FileUploadOptions = {
		fileKey: 'img'
	};
	const fileTransfer: FileTransferObject = this.fileTransfer.create();
	return fileTransfer.upload( img, this.getUrl()+"upload_lectura.php", options);
  }

  subirFotoCorte(img: string){
	const options: FileUploadOptions = {
		fileKey: 'img'
	};
	const fileTransfer: FileTransferObject = this.fileTransfer.create();
	return fileTransfer.upload( img, this.getUrl()+"upload_corte.php", options);
  }

  async alertas(titulo, msg){
  	const alert = await this.alert.create({
  		header: titulo,
  		message: msg,
  		buttons: ['Aceptar']
  	});
  	await alert.present();
	}
	
	async mostrarLoading(){
		this.loading = true;
		return await this.loadingCtrl.create({
			message: 'Cargando datos'
		}).then( a=> {
			a.present().then(() => {
				if(!this.loading){
					a.dismiss().then(() => {});
				}
			});
		});
	}

	async fecharLoading(){
		this.loading = false;
		return await this.loadingCtrl.dismiss().then(() => {});
	}

}
