import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home', 
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { path: 'corte/:idcorte',
    loadChildren: './corte/corte.module#CortePageModule'
  },
  { path: 'lectura/:idlectura',
    loadChildren: './lectura/lectura.module#LecturaPageModule'
  },
  { path: 'entrega/:identrega',
    loadChildren: './entrega/entrega.module#EntregaPageModule'
  },
  { path: 'listacorte', 
    loadChildren: './listacorte/listacorte.module#ListacortePageModule'
  },
  { path: 'listaentrega', 
    loadChildren: './listaentrega/listaentrega.module#ListaentregaPageModule' 
  },
  { path: 'listalectura', 
    loadChildren: './listalectura/listalectura.module#ListalecturaPageModule'
  },
  { path: 'introduccion',
    loadChildren: './introduccion/introduccion.module#IntroduccionPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
