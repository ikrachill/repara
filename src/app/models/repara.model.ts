export type Rol = 'cliente' | 'tecnico';

export interface Solicitud {
  id: number;
  cliente: string;
  equipo: string;
  descripcion: string;
  fecha: string;
  estado: 'pendiente' | 'presupuestada' | 'en reparación' | 'finalizada';
}

export interface Presupuesto {
  id: number;
  solicitudId: number;
  tecnico: string;
  detalle: string;
  monto: number;
  estado: 'pendiente' | 'aceptado';
}

export interface Seguimiento {
  id: number;
  solicitudId: number;
  fecha: string;
  detalle: string;
}

export interface DatosRepara {
  solicitudes: Solicitud[];
  presupuestos: Presupuesto[];
  seguimientos: Seguimiento[];
}
