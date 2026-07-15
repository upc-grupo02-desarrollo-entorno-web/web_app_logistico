import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Despacho } from '../../core/models/despacho.model';
import { DespachosService } from '../../core/services/despachos';

// Orden esperado del ciclo de vida de un despacho
const ORDEN_ESTADOS = ['Cargando', 'En almacén', 'En tránsito', 'Entregado'] as const;

@Component({
  selector: 'app-seguimiento',
  imports: [FormsModule],
  templateUrl: './seguimiento.html',
  styleUrl: './seguimiento.css',
})
export class Seguimiento implements OnInit {

  readonly pasos = ORDEN_ESTADOS;

  despachos: Despacho[] = [];
  codigoSeleccionado = '';

  constructor(private despachosService: DespachosService) {}

  ngOnInit(): void {
    this.despachosService.obtenerTodos().subscribe(despachos => {
      this.despachos = despachos;
      if (despachos.length > 0) {
        this.codigoSeleccionado = despachos[0].codigo;
      }
    });
  }

  get despachoActual(): Despacho | undefined {
    return this.despachos.find(d => d.codigo === this.codigoSeleccionado);
  }

  // Índice del estado actual dentro del ciclo de vida (para pintar los pasos ya completados)
  indicePaso(paso: string): number {
    return ORDEN_ESTADOS.indexOf(paso as typeof ORDEN_ESTADOS[number]);
  }

  indiceActual(): number {
    return this.despachoActual ? this.indicePaso(this.despachoActual.estado) : -1;
  }
}
