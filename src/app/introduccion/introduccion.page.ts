import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-introduccion',
  templateUrl: './introduccion.page.html',
  styleUrls: ['./introduccion.page.scss'],
})
export class IntroduccionPage implements OnInit {
  flag = false;
  constructor(
    public navCtrl: NavController
  ) {
    if (this.flag!=true){
      if (localStorage.getItem('intro') == 'si'){
        this.navCtrl.navigateForward('login');
      }
    }
  }

  ngOnInit() {
  }

  toIntro(){
    localStorage.setItem('intro', 'si');
    this.navCtrl.navigateForward('login');
  }

}
