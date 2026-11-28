import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, type OnInit } from '@angular/core';
import {
  IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent, IonHeader, IonIcon, IonSpinner, IonTitle, IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { receiptOutline } from 'ionicons/icons';
import { finalize } from 'rxjs';

import type { Presupuesto } from '../../models/repara.model';
import { ReparaService } from '../../services/repara.service';

@Component({
  selector: 'app-presupuestos',
  templateUrl: 'presupuestos.page.html',
  styleUrls: ['presupuestos.page.scss'],
  imports: [
    DecimalPipe, NgFor, NgIf, IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader,
    IonCardTitle, IonContent, IonHeader, IonIcon, IonSpinner, IonTitle, IonToolbar,
  ],
})
export class PresupuestosPage implements OnInit {
  presupuestos: (Presupuesto & { equipo: string; nuevo: boolean })[] = [];
  cargando = false;
  error = '';
  private readonly vistos = new Set<number>();
  private yaEntro = false;

  constructor(
    private readonly reparaService: ReparaService,
    private readonly detector: ChangeDetectorRef,
  ) {
    addIcons({ receiptOutline });
  }

  ngOnInit(): void {
    this.cargarPresupuestos();
  }

  ionViewWillEnter(): void {
    if (this.yaEntro) {
      this.cargarPresupuestos();
    }
    this.yaEntro = true;
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
          nuevo: presupuesto.id < 0 && !this.vistos.has(presupuesto.id),
          equipo: solicitudes.find((solicitud) => solicitud.id === presupuesto.solicitudId)?.equipo
            ?? `Solicitud #${presupuesto.solicitudId}`,
        }));
        for (const presupuesto of this.presupuestos) {
          this.vistos.add(presupuesto.id);
        }
      },
      error: () => {
        this.error = 'No se pudieron cargar los presupuestos.';
      },
    });
  }
}
