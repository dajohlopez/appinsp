import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { UrlService } from '../provider/url.service';
import { NavController } from "@ionic/angular";
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../provider/menu.service';

import { ICliente, ILectura, Ifoto } from 'src/shared/interfaces';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-lectura',
  templateUrl: './lectura.page.html',
  styleUrls: ['./lectura.page.scss'],
})
export class LecturaPage implements OnInit {
	idusuario: any;
	idlectura: any;
	objFoto: Ifoto;
	comparar: any;
	//Datos obj cliente
	public cliente: ICliente;
	//Datos obj lectura
	public lectura: ILectura;
	//Array de lecturas
	public tlecturas: any[];
	//Array de obslecturas
	public obslectura: any[];
	//Array de imagenes
	tempImages: string[] = [];
	contadorf = 1;

	actmat: boolean = true;

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
	this.menuService.validarSesion();
	this.postagen = this.formBuilder.group({
		idlectura:  ['', Validators.required],
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
		lanterior: ['', Validators.required],
		lactual: ['', Validators.required],
		tipo: ['', Validators.required],
		construccion: ['', Validators.required],
		uso: ['', Validators.required],
		npisos: ['', Validators.required],
		situacion: ['', Validators.required],
		tnegocio: ['', Validators.required],
		medidor: ['', Validators.required],
		cablec: ['', Validators.required],
		conectorb: ['', Validators.required],
		curvapvc: ['', Validators.required],
		templador: ['', Validators.required],
		cintaa: ['', Validators.required],
		cajap: ['', Validators.required],
		tubof: ['', Validators.required],
		alambre: ['', Validators.required],
		clavos: ['', Validators.required],
		termomagnetico: ['', Validators.required],
		cemento: ['', Validators.required],
		tubopcv: ['', Validators.required],
		obslectura: ['', Validators.required],
		observacion: ['', Validators.required]
	});
   }

  ngOnInit() {
	this.idusuario = localStorage.getItem('idUsuario');
	this.cargarLecturas();
	this.cargarObsLectura();
	this.idlectura = this.activeRouter.snapshot.paramMap.get('idlectura');
	this.getDetalles();
  }

  getDetalles(){
	this.http.get(this.urlService.getUrl()+"detLectura.php?idlectura="+this.idlectura).pipe(map( res => res.json()))
	.subscribe(
		data => {
			this.cliente = data.cliente;
			this.lectura = data.lectura;	
		});
	}

	guardarLectura(){
		if (this.lectura.tmedidor == undefined || this.lectura.tconexion == undefined || this.lectura.estadomedidor == undefined ||
			this.lectura.tipolectura == undefined || this.lectura.lactual == undefined || this.lectura.tipo == undefined ||
			this.lectura.construccion == undefined	|| this.lectura.uso == undefined || this.lectura.situacion == undefined ||
			this.lectura.tnegocio == undefined || this.lectura.obslectura == undefined || this.lectura.observacion == undefined){
				this.urlService.alertas("Error", "Ingrese todos los datos");
		} else {
			this.comparar = this.lectura.tipolectura;
			if (this.comparar == "2" || this.comparar == "4") {
				if (this.lectura.medidor == undefined || this.lectura.cablec == undefined || this.lectura.conectorb == undefined ||
					this.lectura.curvapvc == undefined || this.lectura.templador == undefined || this.lectura.cintaa == undefined ||
					this.lectura.cajap == undefined || this.lectura.tubof == undefined || this.lectura.alambre == undefined ||
					this.lectura.clavos == undefined || this.lectura.termomagnetico == undefined || this.lectura.cemento == undefined ||
					this.lectura.tubopcv == undefined){
						console.log(this.lectura);
						this.urlService.alertas("Error", "Ingrese todos los datos 2");
				} else {
					this.postData(this.postagen.value)
					.subscribe(
						data => {
							this.urlService.alertas("Hecho", "Suministro inspeccionado");
							this.NavCtrl.navigateBack('listalectura');
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
						this.NavCtrl.navigateBack('listalectura');
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
		return this.http.post(this.urlService.getUrl() + "actLectura.php", valor, {
			headers: headers,
			method: "POST"
		}).pipe(map(
			(res: Response) => { return res.json();}
		));
	}

	back(){
		this.NavCtrl.navigateForward('listalectura');
	}

	async cargarLecturas(){
		this.tlecturas = await this.urlService.getTipoLecturas().toPromise();
	}

	async cargarObsLectura(){
		this.obslectura = await this.urlService.getObsLectura().toPromise();
	}

	option_select($event){
		if ($event.target.value == "2" || $event.target.value == "4"){
			this.actmat = false;
			console.log($event.target.value);
			console.log(this.actmat);
		} else {
			this.actmat = true;
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
				await this.urlService.subirFotoLectura(imageData)
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
