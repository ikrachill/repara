import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, type OnInit } from '@angular/core';
import {
  IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent, IonHeader, IonSpinner, IonTitle, IonToolbar,
} from '@ionic/angular';
import { finalize } from 'rxjs';

import type { Presupuesto } from '../../models/repara.model';
import { ReparaService } from '../../services/repara.service';

@Component({
  selector: 'app-presupuestos',
  templateUrl: 'presupuestos.page.html',
  styleUrls: ['presupuestos.page.scss'],
  imports: [
    DecimalPipe, NgFor, NgIf, IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader,
    IonCardTitle, IonContent, IonHeader, IonSpinner, IonTitle, IonToolbar,
  ],
})
export class PresupuestosPage implements OnInit {
  presupuestos: (Presupuesto & { equipo: string })[] = [];
  cargando = false;
  error = '';

  constructor(
    private readonly reparaService: ReparaService,
    private readonly detector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarPresupuestos();
  }

  cargarPresupuestos(): void {
    this.cargando = true;
    this.error = '';

    this.reparaService.obtenerDatos().pipe(
      finalize(() => {
        this.cargando = false;
        this.detector.markForCheck();
      }),
    ).subscribe({
      next: ({ presupuestos, solicitudes }) => {
        this.presupuestos = presupuestos.map((presupuesto) => ({
          ...presupuesto,
          equipo: solicitudes.find((solicitud) => solicitud.id === presupuesto.solicitudId)?.equipo
            ?? `Solicitud #${presupuesto.solicitudId}`,
        }));
      },
      error: () => {
        this.error = 'No se pudieron cargar los presupuestos.';
      },
    });
  }
}
