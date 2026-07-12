import { Injectable } from '@angular/core';
import { Despacho } from '../models/despacho.models';

@Injectable({
  providedIn: 'root'   // ← disponible en toda la app sin importarlo manualmente
})
export class DespachosService {

  private despachos: Despacho[] = [
    { codigo: 'DSP-1001', ruta: 'Lima → Arequipa',   estado: 'En tránsito' },
    { codigo: 'DSP-1002', ruta: 'Callao → Trujillo', estado: 'En almacén'  },
    { codigo: 'DSP-1003', ruta: 'Lima → Cusco',       estado: 'Cargando'    },
    { codigo: 'DSP-1004', ruta: 'Piura → Lima',       estado: 'Entregado'   },
    { codigo: 'DSP-1005', ruta: 'Lima → Trujillo',    estado: 'Entregado'   }
  ];

  obtenerTodos(): Despacho[] {
    return this.despachos;
  }

  obtenerActivos(): Despacho[] {
    return this.despachos.filter(d => d.estado !== 'Entregado');
  }

  obtenerEntregados(): Despacho[] {
    return this.despachos.filter(d => d.estado === 'Entregado');
  }

  obtenerPorCodigo(codigo: string): Despacho | undefined {
    return this.despachos.find(d => d.codigo === codigo);
  }

  crear(despacho: Despacho): void {
    this.despachos.push(despacho);
  }

  actualizar(codigo: string, cambios: Partial<Despacho>): void {
    const despacho = this.obtenerPorCodigo(codigo);
    if (despacho) {
      Object.assign(despacho, cambios);
    }
  }

  eliminar(codigo: string): void {
    this.despachos = this.despachos.filter(d => d.codigo !== codigo);
  }
}