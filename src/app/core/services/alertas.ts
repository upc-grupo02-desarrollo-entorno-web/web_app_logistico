import { Injectable } from '@angular/core';
import { Alerta } from '../models/alerta.model';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  private alertas: Alerta[] = [
    { mensaje: 'El despacho DSP-1001 presenta un retraso de 3 horas.', tipo: 'warning', fecha: '2026-07-01' },
    { mensaje: 'El despacho DSP-1004 fue entregado correctamente.',    tipo: 'success', fecha: '2026-06-28' },
    { mensaje: 'Nueva ruta disponible: Lima → Piura.',                  tipo: 'info',    fecha: '2026-06-25' }
  ];

  obtenerTodas(): Alerta[] {
    return this.alertas;
  }
}