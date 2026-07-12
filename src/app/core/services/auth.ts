import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

// Usuarios de ejemplo — en la Parte 9 esto se reemplaza por una llamada real al backend
interface UsuarioConClave extends Usuario {
  clave: string;
}

const CLAVE_STORAGE = 'if_usuario';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly usuarios: UsuarioConClave[] = [
    { usuario: 'cliente@intermodalflow.com', clave: 'cliente123', nombre: 'Empresa Cliente SAC', rol: 'cliente' },
    { usuario: 'admin@intermodalflow.com',   clave: 'admin123',   nombre: 'Administrador',        rol: 'admin'   }
  ];

  private usuarioActual: Usuario | null = this.leerUsuarioGuardado();

  login(usuario: string, clave: string): Usuario | null {
    const encontrado = this.usuarios.find(u => u.usuario === usuario && u.clave === clave);
    if (!encontrado) {
      return null;
    }
    const { clave: _clave, ...usuarioSinClave } = encontrado;
    this.usuarioActual = usuarioSinClave;
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(usuarioSinClave));
    return usuarioSinClave;
  }

  logout(): void {
    this.usuarioActual = null;
    localStorage.removeItem(CLAVE_STORAGE);
  }

  estaAutenticado(): boolean {
    return this.usuarioActual !== null;
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  private leerUsuarioGuardado(): Usuario | null {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    return guardado ? JSON.parse(guardado) : null;
  }
}