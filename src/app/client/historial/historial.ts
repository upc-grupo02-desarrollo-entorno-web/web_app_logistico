import { Component, OnInit, signal } from '@angular/core';
import { Despacho } from '../../core/models/despacho.model';
import { DespachosService } from '../../core/services/despachos';

@Component({
  selector: 'app-historial',
  imports: [],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial implements OnInit {

  entregados = signal<Despacho[]>([]);

  constructor(private despachosService: DespachosService) {}

  ngOnInit(): void {
    this.despachosService.obtenerTodos().subscribe(despachos => {
      this.entregados.set(despachos.filter(d => d.estado === 'Entregado'));
    });
  }
}

