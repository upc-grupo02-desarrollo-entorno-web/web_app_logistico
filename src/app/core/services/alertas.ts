import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Alerta } from '../models/alerta.model';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  private readonly url = `${environment.apiUrl}/alertas`;

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.url);
  }
}
