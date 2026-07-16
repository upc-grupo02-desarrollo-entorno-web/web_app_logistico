import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Contenedor } from '../../core/models/contenedor.model';
import { ContenedoresService } from '../../core/services/contenedores';

@Component({
  selector: 'app-gestion-contenedores',
  imports: [FormsModule, NgClass],
  templateUrl: './gestion-contenedores.html',
  styleUrl: './gestion-contenedores.css',
})
export class GestionContenedores implements OnInit {

  contenedores = signal<Contenedor[]>([]);

  codigoEnEdicion: string | null = null;
  codigo = '';
  tipo: Contenedor['tipo'] = 'Seco';
  estado: Contenedor['estado'] = 'Disponible';
  ubicacion = '';

  constructor(private contenedoresService: ContenedoresService) {}

  ngOnInit(): void {
    this.recargar();
  }

  private recargar(): void {
    this.contenedoresService.obtenerTodos().subscribe(contenedores => this.contenedores.set(contenedores));
  }

  guardar(): void {
    if (!this.codigo.trim() || !this.ubicacion.trim()) {
      return;
    }

    const datos = { codigo: this.codigo, tipo: this.tipo, estado: this.estado, ubicacion: this.ubicacion };
    const operacion = this.codigoEnEdicion
      ? this.contenedoresService.actualizar(this.codigoEnEdicion, datos)
      : this.contenedoresService.crear(datos);

    operacion.subscribe(() => {
      this.limpiarFormulario();
      this.recargar();
    });
  }

  editar(contenedor: Contenedor): void {
    this.codigoEnEdicion = contenedor.codigo;
    this.codigo = contenedor.codigo;
    this.tipo = contenedor.tipo;
    this.estado = contenedor.estado;
    this.ubicacion = contenedor.ubicacion;
  }

  eliminar(codigo: string): void {
    this.contenedoresService.eliminar(codigo).subscribe(() => this.recargar());
  }

  limpiarFormulario(): void {
    this.codigoEnEdicion = null;
    this.codigo = '';
    this.tipo = 'Seco';
    this.estado = 'Disponible';
    this.ubicacion = '';
  }

  claseBadge(estado: string): string {
    switch (estado) {
      case 'Disponible':    return 'bg-success';
      case 'En uso':        return 'bg-primary';
      case 'Mantenimiento': return 'bg-warning text-dark';
      default:              return 'bg-secondary';
    }
  }
}

