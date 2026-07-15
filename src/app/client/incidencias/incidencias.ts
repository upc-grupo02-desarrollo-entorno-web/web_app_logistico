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
    this.despachosService.obtenerTodos().subscribe(despachos => {
      this.despachos = despachos;
      if (despachos.length > 0) {
        this.despachoRelacionado = despachos[0].codigo;
      }
    });
    this.cargarIncidencias();
  }

  private cargarIncidencias(): void {
    this.incidenciasService.obtenerTodas().subscribe(incidencias => this.incidencias = incidencias);
  }

  registrar(): void {
    if (!this.descripcion.trim()) {
      return;
    }
    this.incidenciasService.crear({
      despachoRelacionado: this.despachoRelacionado,
      tipo: this.tipo,
      descripcion: this.descripcion.trim()
    }).subscribe(() => {
      this.descripcion = '';
      this.cargarIncidencias();
    });
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

