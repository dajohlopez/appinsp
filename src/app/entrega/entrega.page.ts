import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { UrlService } from '../provider/url.service';
import { NavController } from "@ionic/angular";
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../provider/menu.service';

import { ICliente, IEntrega, Ifoto } from 'src/shared/interfaces';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  	selector: 'app-entrega',
  	templateUrl: './entrega.page.html',
	styleUrls: ['./entrega.page.scss'],
})
export class EntregaPage implements OnInit {
	idusuario: any;
	identrega: any;
	objFoto: Ifoto;
  	//Datos obj cliente
	public cliente: ICliente;
	//Datos obj entrega
	public entrega: IEntrega;
	//Array de imagenes
	tempImages: string[] = [];
	contadorf = 1;
	
	formentrega: any;

  	constructor(
    	public NavCtrl: NavController,
		public formBuilder: FormBuilder,
		private http: Http,
		private urlService: UrlService,
		private activeRouter: ActivatedRoute,
		private menuService: MenuService,
		private camera: Camera
  	) { 
		this.menuService.validarSesion();
		this.formentrega = this.formBuilder.group({
			identrega:  ['', Validators.required],
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
			lanterior: ['', Validators.required],
			lactual: ['', Validators.required],
			gnegocio: ['', Validators.required],
			boletin: ['', Validators.required],
			recibo: ['', Validators.required],
			observacion: ['', Validators.required],
			foto1: ['', Validators.required],
			foto2: ['', Validators.required],
			foto3: ['', Validators.required]			
		});
	}

  	ngOnInit() {
		this.idusuario = localStorage.getItem('idUsuario');
		this.identrega = this.activeRouter.snapshot.paramMap.get('identrega');
		this.getDetalles();
  	}

	getDetalles(){
		this.http.get(this.urlService.getUrl()+"detEntrega.php?identrega="+this.identrega).pipe(map( res => res.json()))
		.subscribe(
			data => {
				this.cliente = data.cliente;
				this.entrega = data.entrega;
		});
	}

	grabarEntrega(){
		if (this.tempImages.length == 0){
			this.urlService.alertas("Error", "Suba o seleccione al menos una foto");
		} else {
			if (this.entrega.tmedidor == undefined || this.entrega.tconexion == undefined ||
				this.entrega.estadomedidor == undefined || this.entrega.lactual == undefined ||
				this.entrega.gnegocio == undefined || this.entrega.boletin == undefined ||
				this.entrega.recibo == undefined){
					this.urlService.alertas("Error", "Ingrese todos los datos");
			} else {
				console.log(this.formentrega.value);
				this.postData(this.formentrega.value)
				.subscribe(
					data => {
						console.log("Actualicé con éxito");
						this.urlService.alertas("Hecho", "Suministro inspeccionado");
						this.NavCtrl.navigateBack('listaentrega');
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
		return this.http.post(this.urlService.getUrl() + "actEntrega.php", valor, {
			headers: headers,
			method: "POST"
		}).pipe(map(
			(res: Response) => { return res.json();}
		));
	}

	back(){
		this.NavCtrl.navigateForward('listaentrega');
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
				await this.urlService.subirFotoEntrega(imageData)
				.then(data => {
					this.objFoto = JSON.parse(data.response);
				});
				this.tempImages.push( img );
				if ( this.contadorf == 1){
					this.formentrega.controls['foto1'].setValue(this.objFoto.foto);
					console.log(this.formentrega);
				}				
				if ( this.contadorf == 2){
					this.formentrega.controls['foto2'].setValue(this.objFoto.foto);
				}				
				if ( this.contadorf == 3){
					this.formentrega.controls['foto3'].setValue(this.objFoto.foto);
				}
				this.contadorf = this.contadorf + 1;
			}, (err) => {
				// Handle error
			});
		}		
	}

}
