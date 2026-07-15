import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Incidencia } from '../models/incidencia.model';

@Injectable({
  providedIn: 'root'
})
export class Incidencias {

  private readonly url = `${environment.apiUrl}/incidencias`;

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.url);
  }

  crear(datos: Omit<Incidencia, 'codigo' | 'estado'>): Observable<Incidencia> {
    return this.http.post<Incidencia>(this.url, datos);
  }

  actualizar(codigo: string, cambios: Partial<Incidencia>): Observable<Incidencia> {
    return this.http.put<Incidencia>(`${this.url}/${codigo}`, cambios);
  }
}
