import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';

interface RespuestaLogin {
  token: string;
  usuario: Usuario;
}

const CLAVE_TOKEN = 'if_token';
const CLAVE_USUARIO = 'if_usuario';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly url = `${environment.apiUrl}/auth`;
  private usuarioActual: Usuario | null = this.leerUsuarioGuardado();

  constructor(private http: HttpClient) {}

  // Devuelve un Observable porque el login ahora es una petición HTTP asíncrona
  // al backend (antes era una simple búsqueda en un array en memoria).
  login(usuario: string, clave: string): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(`${this.url}/login`, { usuario, clave }).pipe(
      tap(respuesta => {
        this.usuarioActual = respuesta.usuario;
        localStorage.setItem(CLAVE_TOKEN, respuesta.token);
        localStorage.setItem(CLAVE_USUARIO, JSON.stringify(respuesta.usuario));
      })
    );
  }

  logout(): void {
    this.usuarioActual = null;
    localStorage.removeItem(CLAVE_TOKEN);
    localStorage.removeItem(CLAVE_USUARIO);
  }

  estaAutenticado(): boolean {
    return localStorage.getItem(CLAVE_TOKEN) !== null;
  }

  obtenerToken(): string | null {
    return localStorage.getItem(CLAVE_TOKEN);
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  private leerUsuarioGuardado(): Usuario | null {
    const guardado = localStorage.getItem(CLAVE_USUARIO);
    return guardado ? JSON.parse(guardado) : null;
  }
}
