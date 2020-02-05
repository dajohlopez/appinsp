import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( lista: any[], texto: string): any[] {
    if (texto.length === 0) { return lista;}

    texto.toLocaleLowerCase();

    return lista.filter( objeto => {
      return objeto.suministro.includes(texto);
    });
  }

}
