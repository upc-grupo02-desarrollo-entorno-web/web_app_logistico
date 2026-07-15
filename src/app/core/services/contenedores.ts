import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Contenedor } from '../models/contenedor.model';

@Injectable({
  providedIn: 'root'
})
export class ContenedoresService {

  private readonly url = `${environment.apiUrl}/contenedores`;

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Contenedor[]> {
    return this.http.get<Contenedor[]>(this.url);
  }

  crear(contenedor: Contenedor): Observable<Contenedor> {
    return this.http.post<Contenedor>(this.url, contenedor);
  }

  actualizar(codigo: string, cambios: Partial<Contenedor>): Observable<Contenedor> {
    return this.http.put<Contenedor>(`${this.url}/${codigo}`, cambios);
  }

  eliminar(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${codigo}`);
  }
}
