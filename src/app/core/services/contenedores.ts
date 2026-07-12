import { Injectable } from '@angular/core';
import { Contenedor } from '../models/contenedor.model';

@Injectable({
  providedIn: 'root'
})
export class ContenedoresService {

  private contenedores: Contenedor[] = [
    { codigo: 'CNT-2001', tipo: 'Seco',        estado: 'En uso',        ubicacion: 'Callao' },
    { codigo: 'CNT-2002', tipo: 'Refrigerado', estado: 'Disponible',    ubicacion: 'Lima'   },
    { codigo: 'CNT-2003', tipo: 'Cisterna',    estado: 'Mantenimiento', ubicacion: 'Trujillo' }
  ];

  obtenerTodos(): Contenedor[] {
    return this.contenedores;
  }

  obtenerPorCodigo(codigo: string): Contenedor | undefined {
    return this.contenedores.find(c => c.codigo === codigo);
  }

  crear(contenedor: Contenedor): void {
    this.contenedores.push(contenedor);
  }

  actualizar(codigo: string, cambios: Partial<Contenedor>): void {
    const contenedor = this.obtenerPorCodigo(codigo);
    if (contenedor) {
      Object.assign(contenedor, cambios);
    }
  }

  eliminar(codigo: string): void {
    this.contenedores = this.contenedores.filter(c => c.codigo !== codigo);
  }
}