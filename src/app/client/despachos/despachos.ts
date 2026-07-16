import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Despacho } from '../../core/models/despacho.model';
import { DespachosService } from '../../core/services/despachos';

@Component({
  selector: 'app-despachos',
  imports: [FormsModule, NgClass],
  templateUrl: './despachos.html',
  styleUrl: './despachos.css',
})
export class Despachos implements OnInit {

  todos = signal<Despacho[]>([]);
  filtroEstado = '';

  constructor(private despachosService: DespachosService) {}

  ngOnInit(): void {
    this.despachosService.obtenerTodos().subscribe(despachos => this.todos.set(despachos));
  }

  despachosFiltrados(): Despacho[] {
    return this.todos().filter(d => !this.filtroEstado || d.estado === this.filtroEstado);
  }

  claseBadge(estado: string): string {
    switch (estado) {
      case 'En tránsito': return 'bg-primary';
      case 'En almacén':  return 'bg-warning text-dark';
      case 'Cargando':    return 'bg-info text-dark';
      case 'Entregado':   return 'bg-success';
      default:            return 'bg-secondary';
    }
  }
}
