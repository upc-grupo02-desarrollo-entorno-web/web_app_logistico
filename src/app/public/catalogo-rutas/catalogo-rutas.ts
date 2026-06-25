import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

// Interfaz que define la estructura de cada ruta
interface Ruta {
  codigo: string;
  origen: string;
  destino: string;
  distancia: string;
  tipo: string;
  badgeClass: string;
  tiempo: string;
}

@Component({
  selector: 'app-catalogo-rutas',
  imports: [FormsModule, NgClass],
  templateUrl: './catalogo-rutas.html',
  styleUrl: './catalogo-rutas.css',
})
export class CatalogoRutas {

  filtroTipo = '';
  filtroBuscar = '';

  readonly rutas: Ruta[] = [
    {
      codigo: 'RT-001', origen: 'Lima',   destino: 'Arequipa',
      distancia: '1,010 km', tipo: 'Carga general',
      badgeClass: 'bg-secondary', tiempo: '16 h'
    },
    {
      codigo: 'RT-002', origen: 'Callao', destino: 'Trujillo',
      distancia: '560 km',   tipo: 'Contenedor',
      badgeClass: 'bg-dark',            tiempo: '9 h'
    },
    {
      codigo: 'RT-003', origen: 'Lima',   destino: 'Cusco',
      distancia: '1,100 km', tipo: 'Refrigerada',
      badgeClass: 'bg-info text-dark',  tiempo: '20 h'
    },
    {
      codigo: 'RT-004', origen: 'Piura',  destino: 'Lima',
      distancia: '980 km',   tipo: 'Carga general',
      badgeClass: 'bg-secondary',       tiempo: '15 h'
    }
  ];

  rutasFiltradas(): Ruta[] {
    const buscar = this.filtroBuscar.toLowerCase();
    return this.rutas.filter(r => {
      const coincideTipo = !this.filtroTipo || r.tipo === this.filtroTipo;
      const coincideBuscar = !buscar ||
        r.origen.toLowerCase().includes(buscar) ||
        r.destino.toLowerCase().includes(buscar);
      return coincideTipo && coincideBuscar;
    });
  }

  limpiarFiltros(): void {
    this.filtroTipo = '';
    this.filtroBuscar = '';
  }
}