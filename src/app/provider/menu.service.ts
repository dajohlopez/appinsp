import { Injectable } from '@angular/core';
import { NavController } from "@ionic/angular";

@Injectable({
	providedIn: 'root'
})
export class MenuService {

	public menu = [
		{
			"label": "Inicio",
			"icon": "home",
			"menu": "0",
			"flag": "inicio",
			"mostrar": true
		},
		{
			"label": "Sumns en corte",
			"icon": "cut",
			"menu": "1",
			"flag": "sumns_corte",
			"mostrar": true
		},
		{
			"label": "Sumns para lectura",
			"icon": "book",
			"menu": "2",
			"flag": "sumns_lect",
			"mostrar": true
		},
		{
			"label": "Sumns para entrega",
			"icon": "walk",
			"menu": "3",
			"flag": "sumns_ent",
			"mostrar": true
		}
	];

	public perfilMenu = [];

	constructor(public navCtrl: NavController) { 
		this.validarSesion();
	}

	validarMenu() {
		this.perfilMenu.push(this.menu[0]);
		this.perfilMenu.push(this.menu[1]);
		this.perfilMenu.push(this.menu[2]);
		this.perfilMenu.push(this.menu[3]);
	}

	validarSesion(){
		if (localStorage.getItem('user_logeado') != null){
			console.log("Usuario loggeado")
		} else {
			this.navCtrl.navigateBack('login');
		}
	}
}
