import { Component } from '@angular/core';
import { NavController } from "@ionic/angular";
import { ServiceUserService } from '../provider/service-user.service';
import { MenuService } from '../provider/menu.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	constructor(
		public navCtrl: NavController,
		public serviceUsuario: ServiceUserService,
		public menuService: MenuService
		) { 
		this.menuService.validarMenu();
		console.log(this.serviceUsuario.userName);
		console.log(this.serviceUsuario.idUser);
		console.log(this.serviceUsuario.userUsuario);
	}

	ngOnInit() {
	}

	

}
