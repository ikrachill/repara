import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, type Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import type { DatosRepara, Presupuesto, Rol, Seguimiento, Solicitud } from '../models/repara.model';

@Injectable({ providedIn: 'root' })
export class ReparaService {
  rolActivo: Rol = 'cliente';
  hayPresupuestoNuevo = false;
  haySeguimientoNuevo = false;
  private readonly solicitudesSesion: Solicitud[] = [];
  private readonly presupuestosSesion: Presupuesto[] = [];
  private readonly seguimientosSesion: Seguimiento[] = [];
  private readonly estadosSesion = new Map<number, Solicitud['estado']>();

  constructor(private readonly http: HttpClient) {}

  obtenerDatos(): Observable<DatosRepara> {
    return this.http.get<DatosRepara>(environment.urlRepara).pipe(
      map((datos) => ({
        ...datos,
        presupuestos: [...this.presupuestosSesion, ...datos.presupuestos],
        seguimientos: [...this.seguimientosSesion, ...datos.seguimientos],
        solicitudes: [...this.solicitudesSesion, ...datos.solicitudes].map((solicitud) => ({
          ...solicitud,
          estado: this.estadosSesion.get(solicitud.id) ?? solicitud.estado,
        })),
      })),
    );
  }

  crearSolicitud(equipo: string, descripcion: string, cliente: string): Solicitud | undefined {
    if (this.rolActivo !== 'cliente' || !equipo.trim() || !descripcion.trim() || !cliente.trim()) {
      return;
    }

    const solicitud: Solicitud = {
      id: -(this.solicitudesSesion.length + 1),
      equipo: equipo.trim(),
      descripcion: descripcion.trim(),
      cliente: cliente.trim(),
      fecha: new Date().toLocaleDateString('sv-SE'),
      estado: 'pendiente',
    };
    this.solicitudesSesion.unshift(solicitud);
    return { ...solicitud };
  }

  cerrarSesion(): void {
    this.rolActivo = 'cliente';
  }

  cambiarEstado(solicitud: Solicitud, estado: Solicitud['estado']): boolean {
    if (this.rolActivo === 'tecnico' && solicitud.estado !== estado) {
      this.estadosSesion.set(solicitud.id, estado);
      solicitud.estado = estado;
      if (estado === 'presupuestada'
        && !this.presupuestosSesion.some((presupuesto) => presupuesto.solicitudId === solicitud.id)) {
        this.presupuestosSesion.unshift({
          id: -(this.presupuestosSesion.length + 1),
          solicitudId: solicitud.id,
          tecnico: 'Técnico de guardia',
          detalle: 'Estimación de prueba para diagnóstico y reparación.',
          monto: 150000,
          estado: 'pendiente',
        });
        this.hayPresupuestoNuevo = true;
      }
      this.seguimientosSesion.unshift({
        id: -(this.seguimientosSesion.length + 1),
        solicitudId: solicitud.id,
        fecha: new Date().toLocaleDateString('sv-SE'),
        detalle: `El técnico actualizó el estado a: ${estado}`,
      });
      this.haySeguimientoNuevo = true;
      return true;
    }
    return false;
  }
}
