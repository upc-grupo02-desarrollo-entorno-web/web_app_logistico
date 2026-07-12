// src/app/core/models/usuario.model.ts
export interface Usuario {
  usuario: string;
  nombre: string;
  rol: 'cliente' | 'admin';
}