import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import type { DatosRepara, Rol } from '../models/repara.model';

@Injectable({ providedIn: 'root' })
export class ReparaService {
  rolActivo: Rol = 'cliente';

  constructor(private readonly http: HttpClient) {}

  obtenerDatos(): Observable<DatosRepara> {
    return this.http.get<DatosRepara>(environment.urlRepara);
  }
}
