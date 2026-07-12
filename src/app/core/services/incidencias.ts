import { Injectable } from '@angular/core';
import { Incidencia } from '../models/incidencia.model';

@Injectable({
  providedIn: 'root'
})
export class Incidencias {

  private incidencias: Incidencia[] = [
    {
      codigo: 'INC-001',
      despachoRelacionado: 'DSP-1001',
      tipo: 'Retraso',
      descripcion: 'La carga salió 3 horas tarde del almacén de origen.',
      estado: 'En proceso'
    },
    {
      codigo: 'INC-002',
      despachoRelacionado: 'DSP-1002',
      tipo: 'Documentación',
      descripcion: 'Falta la guía de remisión firmada.',
      estado: 'Abierta'
    },
    {
      codigo: 'INC-003',
      despachoRelacionado: 'DSP-1004',
      tipo: 'Daño en carga',
      descripcion: 'Se detectó humedad en dos cajas al momento de la entrega.',
      estado: 'Resuelta'
    }
  ];

  private siguienteId = 4;

  obtenerTodas(): Incidencia[] {
    return this.incidencias;
  }

  obtenerPorCodigo(codigo: string): Incidencia | undefined {
    return this.incidencias.find(i => i.codigo === codigo);
  }

  crear(datos: Omit<Incidencia, 'codigo' | 'estado'>): void {
    const codigo = `INC-${String(this.siguienteId++).padStart(3, '0')}`;
    this.incidencias.push({ codigo, estado: 'Abierta', ...datos });
  }

  actualizar(codigo: string, cambios: Partial<Incidencia>): void {
    const incidencia = this.obtenerPorCodigo(codigo);
    if (incidencia) {
      Object.assign(incidencia, cambios);
    }
  }
}