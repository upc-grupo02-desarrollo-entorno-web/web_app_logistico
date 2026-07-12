// src/app/core/models/contenedor.model.ts
export interface Contenedor {
  codigo: string;
  tipo: 'Seco' | 'Refrigerado' | 'Cisterna';
  estado: 'Disponible' | 'En uso' | 'Mantenimiento';
  ubicacion: string;
}
