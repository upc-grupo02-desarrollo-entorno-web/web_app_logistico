
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Despacho } from '../../core/models/despacho.model';
import { DespachosService } from '../../core/services/despachos';

@Component({
  selector: 'app-gestion-despachos',
  imports: [FormsModule, NgClass],
  templateUrl: './gestion-despachos.html',
  styleUrl: './gestion-despachos.css',
})
export class GestionDespachos implements OnInit {

  despachos: Despacho[] = [];

  // Campos del formulario de alta/edición — codigoEnEdicion === null significa "modo creación"
  codigoEnEdicion: string | null = null;
  codigo = '';
  ruta = '';
  estado: Despacho['estado'] = 'Cargando';

  constructor(private despachosService: DespachosService) {}

  ngOnInit(): void {
    this.recargar();
  }

  private recargar(): void {
    this.despachosService.obtenerTodos().subscribe(despachos => this.despachos = despachos);
  }

  guardar(): void {
    if (!this.codigo.trim() || !this.ruta.trim()) {
      return;
    }

    const datos = { codigo: this.codigo, ruta: this.ruta, estado: this.estado };
    const operacion = this.codigoEnEdicion
      ? this.despachosService.actualizar(this.codigoEnEdicion, datos)
      : this.despachosService.crear(datos);

    operacion.subscribe(() => {
      this.limpiarFormulario();
      this.recargar();
    });
  }

  editar(despacho: Despacho): void {
    this.codigoEnEdicion = despacho.codigo;
    this.codigo = despacho.codigo;
    this.ruta = despacho.ruta;
    this.estado = despacho.estado;
  }

  eliminar(codigo: string): void {
    this.despachosService.eliminar(codigo).subscribe(() => this.recargar());
  }

  limpiarFormulario(): void {
    this.codigoEnEdicion = null;
    this.codigo = '';
    this.ruta = '';
    this.estado = 'Cargando';
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

