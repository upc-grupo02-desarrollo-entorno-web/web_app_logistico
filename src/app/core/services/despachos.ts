import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Despacho } from '../models/despacho.model';

@Injectable({
  providedIn: 'root'
})
export class DespachosService {

  private readonly url = `${environment.apiUrl}/despachos`;

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Despacho[]> {
    return this.http.get<Despacho[]>(this.url);
  }

  obtenerActivos(): Observable<Despacho[]> {
    return this.http.get<Despacho[]>(`${this.url}/activos`);
  }

  crear(despacho: Despacho): Observable<Despacho> {
    return this.http.post<Despacho>(this.url, despacho);
  }

  actualizar(codigo: string, cambios: Partial<Despacho>): Observable<Despacho> {
    return this.http.put<Despacho>(`${this.url}/${codigo}`, cambios);
  }

  eliminar(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${codigo}`);
  }
}
