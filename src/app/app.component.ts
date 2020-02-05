import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ServiceUserService } from '../app/provider/service-user.service';
import { MenuService } from '../app/provider/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public serviceUsuario: ServiceUserService,
    public navCtrl: NavController,
    public menuService: MenuService
  ) {
    this.serviceUsuario.getUserName();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  Menu(menu){
    switch (menu) {
      case "inicio":
      this.inicio();
      break;
      
      case "sumns_corte":
      this.sumnsCorte();
      break;

      case "sumns_lect":
      this.sumnsLectura();
      break;

      case "sumns_ent":
      this.sumnsEntrega();
      break;

      default:
      // code...
      break;
    }
  }

  inicio(){
    this.navCtrl.navigateForward('home');
  }

  sumnsCorte(){
    this.navCtrl.navigateForward('listacorte');
  }

  sumnsLectura(){
    this.navCtrl.navigateForward('listalectura');
  }

  sumnsEntrega(){
    this.navCtrl.navigateForward('listaentrega');
  }

  salir(){
    localStorage.clear();
    location.reload();
    this.navCtrl.navigateRoot('login');
    localStorage.setItem('deslogeado', "si");
  }

}
