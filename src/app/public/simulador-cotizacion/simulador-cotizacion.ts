import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simulador-cotizacion',
  imports: [FormsModule],
  templateUrl: './simulador-cotizacion.html',
  styleUrl: './simulador-cotizacion.css',
})
export class SimuladorCotizacion {

  // Valores del formulario — se sincronizan con los inputs del HTML via [(ngModel)]
  origen    = 'Lima';
  destino   = 'Arequipa';
  peso      = 500;
  tipoCarga = 'Carga general';

  // Valores del resultado del cálculo
  tarifaBase  = 0;
  recargoPeso = 0;
  gestion     = 0;
  total       = 0;
  calculado   = false;    // controla si mostramos el resultado o no

  // Tabla de tarifas base por tipo de carga
  // Record<string, number> es un tipo TypeScript para un objeto {llave: valor}
  private readonly tarifas: Record<string, number> = {
    'Carga general': 1200,
    'Refrigerada':   2400,
    'Peligrosa':     3100,
    'Contenedor':    1800
  };

  calcular(): void {
    // ?? es el operador "nullish coalescing": si tarifas[tipoCarga] es null/undefined, usa 1200
    this.tarifaBase  = this.tarifas[this.tipoCarga] ?? 1200;
    this.recargoPeso = Math.round(this.peso * 0.48);  // S/ 0.48 por kg
    this.gestion     = 100;
    this.total       = this.tarifaBase + this.recargoPeso + this.gestion;
    this.calculado   = true;
  }

  // Formatea un número como moneda peruana: 1540 → "1,540.00"
  formatear(valor: number): string {
    return valor.toLocaleString('es-PE', { minimumFractionDigits: 2 });
  }
}