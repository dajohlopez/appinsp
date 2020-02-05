import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { UrlService } from '../provider/url.service';
import { NavController } from "@ionic/angular";
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../provider/menu.service';

import { ICliente, ICorte, Ifoto } from '../../shared/interfaces';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
	selector: 'app-corte',
	templateUrl: './corte.page.html',
	styleUrls: ['./corte.page.scss'],
})
export class CortePage implements OnInit {
	idusuario: any;
	idcorte: any;
	objFoto: Ifoto;
	//Datos obj cliente
	public cliente: ICliente;
	//Datos obj corte
	public corte: ICorte;
	//Array de lecturas
	public lecturas: any[];
	//Array de obslecturas
	public obslectura: any[];
	//Array de imagenes
	tempImages: string[] = [];
	contadorf = 1;

	actvst: boolean = true;
	lst: boolean = true;
	
	postagen: any;

	constructor(
		public NavCtrl: NavController,
		public formBuilder: FormBuilder,
		private http: Http,
		private urlService: UrlService,
		private activeRouter: ActivatedRoute,
		private menuService: MenuService,
		private camera: Camera
	) { 		
		this.actvst = true;
		this.lst = true;
		this.menuService.validarSesion();		
		this.postagen = this.formBuilder.group({
			idcorte:  ['', Validators.required],
			idusuario: ['', Validators.required],
			suministro: ['', Validators.required],
			rutasuministro: ['', Validators.required],
			nombres: ['', Validators.required],
			direccion: ['', Validators.required],
			delectrica: ['', Validators.required],
			tmedidor: ['', Validators.required],
			tconexion: ['', Validators.required],
			estadomedidor: ['', Validators.required],
			serie: ['', Validators.required],
			tipolectura: ['', Validators.required],
			mdeuda: ['', Validators.required],
			lanterior: ['', Validators.required],
			lactual: ['', Validators.required],
			situacion: ['', Validators.required],
			tcorte: ['', Validators.required],
			sticker: ['', Validators.required],
			lsticker: ['', Validators.required],
			lugar: ['', Validators.required],
			suministrorec: ['', Validators.required],
			nsticker: ['', Validators.required],
			fechast: ['', Validators.required],
			horast: ['', Validators.required],
			lectura: ['', Validators.required],
			tcortes: ['', Validators.required],
			obslectura: ['', Validators.required],
			observacion: ['', Validators.required],
			foto1: ['', Validators.required],
			foto2: ['', Validators.required],
			foto3: ['', Validators.required]
		});
	}

	ngOnInit() {
		this.idusuario = localStorage.getItem('idUsuario');
		this.actvst = true;
		this.lst = true;
		this.cargarLecturas();
		this.cargarObsLecturas();
		this.idcorte = this.activeRouter.snapshot.paramMap.get('idcorte');
		this.getDetalles();
	}

	getDetalles(){
		this.http.get(this.urlService.getUrl()+"detCorte.php?idcorte="+this.idcorte).pipe(map( res => res.json()))
		.subscribe(
			data => {
				this.cliente = data.cliente;
				this.corte = data.corte;
		});
	}

	grabarCorte(){
		if (this.corte.tmedidor == undefined || this.corte.tconexion == undefined || this.corte.estadomedidor == undefined ||
			this.corte.tipolectura == undefined || this.corte.lactual == undefined || this.corte.situacion == undefined ||
			this.corte.tcorte == undefined || this.corte.sticker == undefined || this.corte.suministrorec == undefined ||
			this.corte.observacion == undefined || this.corte.obslectura == undefined){
				this.urlService.alertas("Error", "Ingrese todos los datos");
		} else {
			if (this.corte.sticker == "0") {
				if (this.corte.lsticker == undefined || this.corte.nsticker == undefined ||
					this.corte.fechast == undefined || this.corte.horast == undefined ||
					this.corte.lectura == undefined || this.corte.tcortes == undefined){
						this.urlService.alertas("Error", "Ingrese todos los datos");
				} else {
					if ( this.corte.lsticker == "1"){
						if (this.corte.lugar == undefined) {
							this.urlService.alertas("Error", "Ingrese todos los datos");
						} else {
							this.postData(this.postagen.value)
							.subscribe(
								data => {
									this.urlService.alertas("Hecho", "Suministro inspeccionado");
									this.NavCtrl.navigateBack('listacorte');
								},
								err => {
									console.log("error al intentar actualizar"+err);
								}
							)
						}
					} else {
						this.postData(this.postagen.value)
						.subscribe(
							data => {
								this.urlService.alertas("Hecho", "Suministro inspeccionado");
								this.NavCtrl.navigateBack('listacorte');
							},
							err => {
								console.log("error al intentar actualizar"+err);
							}
						)
					}
				}

			} else {
				this.postData(this.postagen.value)
				.subscribe(
					data => {
						this.urlService.alertas("Hecho", "Suministro inspeccionado");
						this.NavCtrl.navigateBack('listacorte');
					},
					err => {
						console.log("error al intentar actualizar"+err);
					}
				)
			}
		} 
			
	}	
	
	postData(valor){
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
		return this.http.post(this.urlService.getUrl() + "actCorte.php", valor, {
			headers: headers,
			method: "POST"
		}).pipe(map(
			(res: Response) => { return res.json();}
		));
	}

	back(){
		this.NavCtrl.navigateForward('listacorte');
	}

	async cargarLecturas(){
		this.lecturas = await this.urlService.getTipoLecturas().toPromise();
	}
	
	async cargarObsLecturas(){
		this.obslectura = await this.urlService.getZonas().toPromise();
	}

	option_select($event){
		if ($event.target.value == "1"){
			this.actvst = true;
			this.lst = true;
		} else {
			this.actvst = false;
			this.lst = true;
		}
	}

	option_select2($event){
		if ($event.target.value == "0"){
			this.lst = true;			
		} else {			
			this.lst = false;
		}
	}

	camara(){
		const options: CameraOptions = {
			quality: 60,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true,
			sourceType: this.camera.PictureSourceType.CAMERA
		};

		this.procesarImagen( options );
		  
		
	}

	libreria(){
		const options: CameraOptions = {
			quality: 60,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
		};

		this.procesarImagen( options );

	}

	procesarImagen( options: CameraOptions ){
		if (this.tempImages.length > 2) {
			this.urlService.alertas("Error", "Solo puede elegir tres fotos");
		} else {
			this.camera.getPicture(options).then(async (imageData) => {
				// imageData is either a base64 encoded string or a file URI
				// If it's base64 (DATA_URL):
				const img = window.Ionic.WebView.convertFileSrc(imageData);
				await this.urlService.subirFotoCorte(imageData)
				.then(data => {
					this.objFoto = JSON.parse(data.response);
				});
				this.tempImages.push( img );
				if ( this.contadorf == 1){
					this.postagen.foto1 = this.objFoto.foto;
				}				
				if ( this.contadorf == 2){
					this.postagen.foto2 = this.objFoto.foto;
				}				
				if ( this.contadorf == 3){
					this.postagen.foto3 = this.objFoto.foto;
				}
				this.contadorf = this.contadorf + 1;
			}, (err) => {
				// Handle error
			});
		}		
	}

}
