import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, type OnInit } from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { documentTextOutline, syncOutline } from 'ionicons/icons';
import { finalize } from 'rxjs';

import type { Rol, Solicitud } from '../../models/repara.model';
import { ReparaService } from '../../services/repara.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: 'solicitudes.page.html',
  styleUrls: ['solicitudes.page.scss'],
  imports: [
    NgFor, NgIf, IonBadge, IonButton, IonContent, IonHeader, IonIcon, IonItem,
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
    private readonly toastController: ToastController,
  ) {
    addIcons({ documentTextOutline, syncOutline });
  }

  private readonly estados: Solicitud['estado'][] = [
    'pendiente', 'presupuestada', 'en reparación', 'finalizada',
  ];

  get rolActivo(): Rol {
    return this.reparaService.rolActivo;
  }

  async avanzarEstado(solicitud: Solicitud): Promise<void> {
    const siguiente = this.estados[this.estados.indexOf(solicitud.estado) + 1];
    if (siguiente && this.reparaService.cambiarEstado(solicitud, siguiente)) {
      const toast = await this.toastController.create({
        message: 'Solicitud actualizada con éxito',
        duration: 1800,
        position: 'bottom',
        positionAnchor: 'barra-pestanas',
      });
      await toast.present();
    }
  }

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
