import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Incidencia } from '../../core/models/incidencia.model';
import { Incidencias as IncidenciasService } from '../../core/services/incidencias';

@Component({
  selector: 'app-gestion-incidencias',
  imports: [FormsModule, NgClass],
  templateUrl: './gestion-incidencias.html',
  styleUrl: './gestion-incidencias.css',
})
export class GestionIncidencias implements OnInit {

  incidencias: Incidencia[] = [];

  constructor(private incidenciasService: IncidenciasService) {}

  ngOnInit(): void {
    this.incidencias = this.incidenciasService.obtenerTodas();
  }

  cambiarEstado(incidencia: Incidencia, nuevoEstado: Incidencia['estado']): void {
    this.incidenciasService.actualizar(incidencia.codigo, { estado: nuevoEstado });
  }

  claseBadge(estado: string): string {
    switch (estado) {
      case 'Abierta':    return 'bg-danger';
      case 'En proceso':  return 'bg-warning text-dark';
      case 'Resuelta':    return 'bg-success';
      default:            return 'bg-secondary';
    }
  }
}

