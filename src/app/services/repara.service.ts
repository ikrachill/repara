import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, type Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import type { DatosRepara, Rol, Seguimiento, Solicitud } from '../models/repara.model';

@Injectable({ providedIn: 'root' })
export class ReparaService {
  rolActivo: Rol = 'cliente';
  private readonly seguimientosSesion: Seguimiento[] = [];
  private readonly estadosSesion = new Map<number, Solicitud['estado']>();

  constructor(private readonly http: HttpClient) {}

  obtenerDatos(): Observable<DatosRepara> {
    return this.http.get<DatosRepara>(environment.urlRepara).pipe(
      map((datos) => ({
        ...datos,
        seguimientos: [...this.seguimientosSesion, ...datos.seguimientos],
        solicitudes: datos.solicitudes.map((solicitud) => ({
          ...solicitud,
          estado: this.estadosSesion.get(solicitud.id) ?? solicitud.estado,
        })),
      })),
    );
  }

  cambiarEstado(solicitud: Solicitud, estado: Solicitud['estado']): void {
    if (this.rolActivo === 'tecnico' && solicitud.estado !== estado) {
      this.estadosSesion.set(solicitud.id, estado);
      solicitud.estado = estado;
      this.seguimientosSesion.unshift({
        id: -(this.seguimientosSesion.length + 1),
        solicitudId: solicitud.id,
        fecha: new Date().toLocaleDateString('sv-SE'),
        detalle: `El técnico actualizó el estado del equipo a ${estado}`,
      });
    }
  }
}
