import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Incidencia } from '../../core/models/incidencia.model';
import { Despacho } from '../../core/models/despacho.model';
import { Incidencias as IncidenciasService } from '../../core/services/incidencias';
import { DespachosService } from '../../core/services/despachos';

@Component({
  selector: 'app-incidencias',
  imports: [FormsModule, NgClass],
  templateUrl: './incidencias.html',
  styleUrl: './incidencias.css',
})
export class Incidencias implements OnInit {

  incidencias: Incidencia[] = [];
  despachos: Despacho[] = [];

  // Campos del formulario de nueva incidencia
  despachoRelacionado = '';
  tipo: Incidencia['tipo'] = 'Retraso';
  descripcion = '';

  constructor(
    private incidenciasService: IncidenciasService,
    private despachosService: DespachosService
  ) {}

  ngOnInit(): void {
    this.despachos = this.despachosService.obtenerTodos();
    this.incidencias = this.incidenciasService.obtenerTodas();
    if (this.despachos.length > 0) {
      this.despachoRelacionado = this.despachos[0].codigo;
    }
  }

  registrar(): void {
    if (!this.descripcion.trim()) {
      return;
    }
    this.incidenciasService.crear({
      despachoRelacionado: this.despachoRelacionado,
      tipo: this.tipo,
      descripcion: this.descripcion.trim()
    });
    this.descripcion = '';
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

