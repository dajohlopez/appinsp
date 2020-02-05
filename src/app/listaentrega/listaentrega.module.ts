import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaentregaPage } from './listaentrega.page';
import { PipesModule } from '../pipes/pipes.module';
import { MapaPage } from '../mapa/mapa.page';
import { MapaPageModule } from '../mapa/mapa.module';

const routes: Routes = [
  {
    path: '',
    component: ListaentregaPage
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
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [ListaentregaPage]
})
export class ListaentregaPageModule {}
