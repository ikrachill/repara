import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, type OnInit } from '@angular/core';
import {
  IonButton, IonItem, IonLabel, IonList, IonNote,
  IonContent, IonHeader, IonIcon, IonSpinner, IonTitle, IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { timeOutline } from 'ionicons/icons';
import { finalize } from 'rxjs';

import type { Seguimiento } from '../../models/repara.model';
import { ReparaService } from '../../services/repara.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: 'seguimiento.page.html',
  styleUrls: ['seguimiento.page.scss'],
  imports: [
    NgFor, NgIf, IonButton, IonItem, IonLabel, IonList, IonNote, IonContent, IonHeader, IonIcon, IonSpinner, IonTitle, IonToolbar,
  ],
})
export class SeguimientoPage implements OnInit {
  seguimientos: (Seguimiento & { equipo: string })[] = [];
  cargando = false;
  error = '';

  constructor(
    private readonly reparaService: ReparaService,
    private readonly detector: ChangeDetectorRef,
  ) {
    addIcons({ timeOutline });
  }

  ngOnInit(): void {
    this.cargarSeguimientos();
  }

  cargarSeguimientos(): void {
    this.cargando = true;
    this.error = '';

    this.reparaService.obtenerDatos().pipe(
      finalize(() => {
        this.cargando = false;
        this.detector.markForCheck();
      }),
    ).subscribe({
      next: ({ seguimientos, solicitudes }) => {
        this.seguimientos = seguimientos
          .slice()
          .sort((primero, segundo) => segundo.fecha.localeCompare(primero.fecha))
          .map((seguimiento) => ({
            ...seguimiento,
            equipo: solicitudes.find((solicitud) => solicitud.id === seguimiento.solicitudId)?.equipo
              ?? `Solicitud #${seguimiento.solicitudId}`,
          }));
      },
      error: () => {
        this.error = 'No se pudieron cargar los seguimientos.';
      },
    });
  }
}
