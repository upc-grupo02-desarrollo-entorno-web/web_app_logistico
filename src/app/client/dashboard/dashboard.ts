import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Despacho } from '../../core/models/despacho.model';
import { DespachosService } from '../../core/services/despachos';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  despachosActivos: Despacho[] = [];

  // Inyección de dependencias: Angular provee el servicio automáticamente
  constructor(private despachosService: DespachosService) {}

  // ngOnInit se ejecuta cuando el componente termina de inicializarse

  ngOnInit(): void {
    this.despachosService.obtenerActivos().subscribe(despachos => this.despachosActivos = despachos);
  }

  // Devuelve la clase CSS del badge según el estado del despacho
  claseBadge(estado: string): string {
    switch (estado) {
      case 'En tránsito': return 'bg-primary';
      case 'En almacén':  return 'bg-warning text-dark';
      case 'Cargando':    return 'bg-info text-dark';
      default:            return 'bg-secondary';
    }
  }
}
