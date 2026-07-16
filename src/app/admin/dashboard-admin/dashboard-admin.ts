import { Component, OnInit, signal } from '@angular/core';
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

  totalDespachos = signal(0);
  contenedoresActivos = signal(0);
  incidenciasAbiertas = signal(0);

  constructor(
    private despachosService: DespachosService,
    private contenedoresService: ContenedoresService,
    private incidenciasService: Incidencias
  ) {}

  ngOnInit(): void {
    this.despachosService.obtenerTodos().subscribe(despachos => this.totalDespachos.set(despachos.length));

    this.contenedoresService.obtenerTodos().subscribe(contenedores => {
      this.contenedoresActivos.set(contenedores.filter(c => c.estado === 'En uso').length);
    });

    this.incidenciasService.obtenerTodas().subscribe(incidencias => {
      this.incidenciasAbiertas.set(incidencias.filter(i => i.estado === 'Abierta').length);
    });
  }
}
