import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, type OnInit } from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSpinner,
  IonTextarea,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, documentTextOutline, logOutOutline, syncOutline } from 'ionicons/icons';
import { finalize } from 'rxjs';

import type { Rol, Solicitud } from '../../models/repara.model';
import { ReparaService } from '../../services/repara.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: 'solicitudes.page.html',
  styleUrls: ['solicitudes.page.scss'],
  imports: [
    FormsModule, NgFor, NgIf, IonBadge, IonButton, IonButtons, IonContent, IonFab,
    IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonTextarea,
    IonLabel, IonList, IonSpinner, IonTitle, IonToolbar,
  ],
})
export class SolicitudesPage implements OnInit {
  solicitudes: Solicitud[] = [];
  cargando = false;
  error = '';
  formularioAbierto = false;
  equipo = '';
  problema = '';
  cliente = '';

  constructor(
    private readonly reparaService: ReparaService,
    private readonly detector: ChangeDetectorRef,
    private readonly toastController: ToastController,
    private readonly router: Router,
  ) {
    addIcons({ addOutline, documentTextOutline, logOutOutline, syncOutline });
  }

  private readonly estados: Solicitud['estado'][] = [
    'pendiente', 'presupuestada', 'en reparación', 'finalizada',
  ];

  get rolActivo(): Rol {
    return this.reparaService.rolActivo;
  }

  cerrarSesion(): void {
    this.reparaService.cerrarSesion();
    void this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  cerrarFormulario(): void {
    this.formularioAbierto = false;
    this.equipo = '';
    this.problema = '';
    this.cliente = '';
  }

  guardarSolicitud(): void {
    const solicitud = this.reparaService.crearSolicitud(this.equipo, this.problema, this.cliente);
    if (solicitud) {
      this.solicitudes = [solicitud, ...this.solicitudes];
      this.cerrarFormulario();
    }
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
