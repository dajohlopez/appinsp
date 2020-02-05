import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListacortePage } from './listacorte.page';
import { MapaPage } from '../mapa/mapa.page';
import { MapaPageModule } from '../mapa/mapa.module';

const routes: Routes = [
  {
    path: '',
    component: ListacortePage
  }
];

@NgModule({
  entryComponents: [
    MapaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListacortePage]
})
export class ListacortePageModule {}
