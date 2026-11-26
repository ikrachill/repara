import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, type OnInit } from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { finalize } from 'rxjs';

import type { Solicitud } from '../../models/repara.model';
import { ReparaService } from '../../services/repara.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: 'solicitudes.page.html',
  styleUrls: ['solicitudes.page.scss'],
  imports: [
    NgFor, NgIf, IonBadge, IonButton, IonContent, IonHeader, IonItem,
    IonLabel, IonList, IonSpinner, IonTitle, IonToolbar,
  ],
})
export class SolicitudesPage implements OnInit {
  solicitudes: Solicitud[] = [];
  cargando = false;
  error = '';

  constructor(
    private readonly reparaService: ReparaService,
    private readonly detector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.cargando = true;
    this.error = '';

    this.reparaService.obtenerDatos().pipe(
      finalize(() => {
        this.cargando = false;
        this.detector.markForCheck();
      }),
    ).subscribe({
      next: ({ solicitudes }) => {
        this.solicitudes = solicitudes;
      },
      error: () => {
        this.error = 'No se pudieron cargar las solicitudes.';
      },
    });
  }
}
