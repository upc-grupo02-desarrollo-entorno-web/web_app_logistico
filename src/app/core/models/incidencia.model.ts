export interface Incidencia {
  codigo: string;
  despachoRelacionado: string;
  tipo: 'Retraso' | 'Daño en carga' | 'Documentación' | 'Otro';
  descripcion: string;
  estado: 'Abierta' | 'En proceso' | 'Resuelta';
}