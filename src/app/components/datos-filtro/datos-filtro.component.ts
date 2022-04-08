import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-filtro',
  templateUrl: './datos-filtro.component.html',
  styleUrls: ['./datos-filtro.component.scss']
})
export class DatosFiltroComponent {
  numbers:number[] = [];
  totalItems= 100;
  currentPage = 1;
  numeroElementos = 18;

  constructor() {
    this.numbers = Array(100).fill(0).map((x,i)=>i);
  }



  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.recalcularFilas();
  }

recalcularFilas(){
  let alto_div = 0;
  let div_tareas = document.getElementById("cuerpo-tabla");
  if(div_tareas!==null){
    alto_div = div_tareas.offsetHeight;
  }
  let num_pag = Math.floor(alto_div/42);
  this.cambiarPaginacion(1, num_pag);
}

cambiarPaginacion(pag: number, items:number){
  this.numeroElementos = items;
  setTimeout(() => this.currentPage = pag, 100);
}

}
