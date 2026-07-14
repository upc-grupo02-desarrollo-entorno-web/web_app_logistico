import { Component, OnInit } from '@angular/core';
import { Alerta } from '../../core/models/alerta.model';
import { AlertasService } from '../../core/services/alertas';

@Component({
  selector: 'app-centro-alertas',
  imports: [],
  templateUrl: './centro-alertas.html',
  styleUrl: './centro-alertas.css',
})
export class CentroAlertas implements OnInit {

  alertas: Alerta[] = [];

  constructor(private alertasService: AlertasService) {}

  ngOnInit(): void {
    this.alertas = this.alertasService.obtenerTodas();
  }

  icono(tipo: string): string {
    switch (tipo) {
      case 'warning': return 'bi-exclamation-triangle-fill text-warning';
      case 'success': return 'bi-check-circle-fill text-success';
      default:        return 'bi-info-circle-fill text-info';
    }
  }
}
