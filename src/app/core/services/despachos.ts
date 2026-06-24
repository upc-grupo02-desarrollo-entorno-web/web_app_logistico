// src/app/core/services/despachos.ts
import { Injectable } from '@angular/core';
import { Despacho } from '../models/despacho.models';

@Injectable({
  providedIn: 'root'   // ← disponible en toda la app sin importarlo manualmente
})
export class DespachosService {

  private despachos: Despacho[] = [
    { codigo: 'DSP-1001', ruta: 'Lima → Arequipa',   estado: 'En tránsito' },
    { codigo: 'DSP-1002', ruta: 'Callao → Trujillo', estado: 'En almacén'  },
    { codigo: 'DSP-1003', ruta: 'Lima → Cusco',       estado: 'Cargando'    }
  ];

  obtenerTodos(): Despacho[] {
    return this.despachos;
  }

  obtenerActivos(): Despacho[] {
    return this.despachos.filter(d => d.estado !== 'Entregado');
  }
}