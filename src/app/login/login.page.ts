import { Component, OnInit } from '@angular/core';

import { map } from "rxjs/operators";
import { Http } from "@angular/http";
import { UrlService } from "../provider/url.service";
import { ServiceUserService } from "../provider/service-user.service";
import { AlertController, NavController, LoadingController } from "@ionic/angular";

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	usuario: string;
	password: string;

	constructor(
		public http: Http,
		public serviceUrl: UrlService,
		public serviceUsuario: ServiceUserService,
		public alert: AlertController,
		public navCtrl: NavController,
		public loading: LoadingController
		) { 
			if (localStorage.getItem('deslogeado') == "si"){
				localStorage.setItem('deslogeado', "no");
				location.reload();
			}

			if (localStorage.getItem('user_logeado') != null){
				this.autenticar();
				console.log('atenticado');
				this.navCtrl.navigateForward('home');
			}
		}

	ngOnInit() {
	}

	async login(){
		if(this.usuario == undefined || this.password == undefined || this.usuario == "" || this.password == ""){
			this.serviceUrl.alertas('Atención', 'Rellene todos los campos!');
		} else {

			const load = await this.loading.create({
				spinner: 'lines-small',
				message: 'Verificando datos...'
			});
			await load.present();

			this.http.get(this.serviceUrl.getUrl()+"login.php?usuario="+this.usuario+"&password="+this.password).pipe(map(res =>
				res.json()))
			.subscribe(

				data => {
					if(data.msg.log == "si"){
						if(data.datos.estado == '1'){
							this.serviceUsuario.setUserName(data.datos.nombre+" "+data.datos.apellido);
							this.serviceUsuario.setIdUser(data.datos.id);
							this.serviceUsuario.setUserUsuario(data.datos.usuario);
							localStorage.setItem('idUsuario', data.datos.id);
							localStorage.setItem('nombreUsuario', data.datos.nombre+" "+data.datos.apellido);
							localStorage.setItem('usuario', data.datos.usuario);
							load.dismiss();
							localStorage.setItem('user_logeado', data);
							this.navCtrl.navigateBack('home');		
						}else {
							load.dismiss();
							this.serviceUrl.alertas('Atención', 'Usuario inactivo, consulte con el administrador');
						}              
					} else {
						load.dismiss();
						this.serviceUrl.alertas('Error', 'Usuario o contraseña incorrectos!');
					}
				}

			);
		}
	}

	autenticar(){
		this.serviceUsuario.setIdUser(localStorage.getItem('idUsuario'));
		this.serviceUsuario.setUserUsuario(localStorage.getItem('usuario'));
		this.serviceUsuario.setUserName(localStorage.getItem('nombreUsuario'));
	}

}
