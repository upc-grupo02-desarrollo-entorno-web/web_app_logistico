import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

// Definimos la estructura de un servicio con una interfaz TypeScript
interface Servicio {
  tipo: string;
  badgeClass: string;   // clase CSS de Bootstrap para el badge de color
  nombre: string;
  descripcion: string;
  precio: string;
}

@Component({
  selector: 'app-catalogo-servicios',
  imports: [FormsModule, NgClass],
  templateUrl: './catalogo-servicios.html',
  styleUrl: './catalogo-servicios.css',
})
export class CatalogoServicios {

  filtroTipo = '';       // valor del select de tipo de carga
  filtroBuscar = '';     // valor del input de búsqueda

  // Lista completa de servicios (datos estáticos para esta versión)
  readonly servicios: Servicio[] = [
    {
      tipo: 'Carga general',
      badgeClass: 'bg-secondary',
      nombre: 'Transporte terrestre nacional',
      descripcion: 'Distribución de carga seca en rutas nacionales con seguimiento de estado.',
      precio: 'S/ 1,200'
    },
    {
      tipo: 'Refrigerada',
      badgeClass: 'bg-info text-dark',
      nombre: 'Cadena de frío',
      descripcion: 'Transporte refrigerado para productos perecibles con control de temperatura.',
      precio: 'S/ 2,400'
    },
    {
      tipo: 'Peligrosa',
      badgeClass: 'bg-warning text-dark',
      nombre: 'Carga peligrosa (MATPEL)',
      descripcion: 'Manejo especializado de materiales peligrosos con personal certificado.',
      precio: 'S/ 3,100'
    },
    {
      tipo: 'Contenedor',
      badgeClass: 'bg-dark',
      nombre: 'Movimiento de contenedores',
      descripcion: "Traslado de contenedores 20' y 40' entre puerto y almacén.",
      precio: 'S/ 1,800'
    }
  ];

  // Método que devuelve solo los servicios que coinciden con los filtros activos
  serviciosFiltrados(): Servicio[] {
    return this.servicios.filter(s => {
      const coincideTipo = !this.filtroTipo || s.tipo === this.filtroTipo;
      const coincideBuscar = !this.filtroBuscar ||
        s.nombre.toLowerCase().includes(this.filtroBuscar.toLowerCase());
      return coincideTipo && coincideBuscar;
    });
  }

  limpiarFiltros(): void {
    this.filtroTipo = '';
    this.filtroBuscar = '';
  }
}