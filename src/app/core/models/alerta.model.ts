export interface Alerta {
  mensaje: string;
  tipo: 'warning' | 'info' | 'success';
  fecha: string;
}
