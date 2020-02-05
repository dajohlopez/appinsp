import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListalecturaPage } from './listalectura.page';
import { MapaPage } from '../mapa/mapa.page';
import { MapaPageModule } from '../mapa/mapa.module';

const routes: Routes = [
  {
    path: '',
    component: ListalecturaPage
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
  declarations: [ListalecturaPage]
})
export class ListalecturaPageModule {}
