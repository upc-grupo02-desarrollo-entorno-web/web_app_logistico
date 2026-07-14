import { Component, OnInit } from '@angular/core';
import { DespachosService } from '../../core/services/despachos';
import { ContenedoresService } from '../../core/services/contenedores';
import { Incidencias } from '../../core/services/incidencias';

@Component({
  selector: 'app-dashboard-admin',
  imports: [],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})
export class DashboardAdmin implements OnInit {

  totalDespachos = 0;
  contenedoresActivos = 0;
  incidenciasAbiertas = 0;

  constructor(
    private despachosService: DespachosService,
    private contenedoresService: ContenedoresService,
    private incidenciasService: Incidencias
  ) {}

  ngOnInit(): void {
    this.totalDespachos = this.despachosService.obtenerTodos().length;
    this.contenedoresActivos = this.contenedoresService.obtenerTodos()
      .filter(c => c.estado === 'En uso').length;
    this.incidenciasAbiertas = this.incidenciasService.obtenerTodas()
      .filter(i => i.estado === 'Abierta').length;
  }
}