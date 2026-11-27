import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, type Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import type { DatosRepara, Rol, Solicitud } from '../models/repara.model';

@Injectable({ providedIn: 'root' })
export class ReparaService {
  rolActivo: Rol = 'cliente';
  private readonly estadosSesion = new Map<number, Solicitud['estado']>();

  constructor(private readonly http: HttpClient) {}

  obtenerDatos(): Observable<DatosRepara> {
    return this.http.get<DatosRepara>(environment.urlRepara).pipe(
      map((datos) => ({
        ...datos,
        solicitudes: datos.solicitudes.map((solicitud) => ({
          ...solicitud,
          estado: this.estadosSesion.get(solicitud.id) ?? solicitud.estado,
        })),
      })),
    );
  }

  cambiarEstado(solicitud: Solicitud, estado: Solicitud['estado']): void {
    if (this.rolActivo === 'tecnico') {
      this.estadosSesion.set(solicitud.id, estado);
      solicitud.estado = estado;
    }
  }
}
