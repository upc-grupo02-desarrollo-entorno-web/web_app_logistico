export interface Despacho {
  codigo: string;
  ruta: string;
  estado: 'En tránsito' | 'En almacén' | 'Cargando' | 'Entregado';
}