import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonInput, IonSelect, IonSelectOption } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { checkmarkCircleOutline } from 'ionicons/icons';

import type { Rol } from '../../models/repara.model';
import { ReparaService } from '../../services/repara.service';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  templateUrl: './bienvenida.page.html',
  styleUrl: './bienvenida.page.scss',
  imports: [IonButton, IonContent, IonIcon, IonInput, IonSelect, IonSelectOption],
})
export class BienvenidaPage {
  rol: Rol;

  constructor(
    private readonly reparaService: ReparaService,
    private readonly router: Router,
  ) {
    this.rol = reparaService.rolActivo;
    addIcons({ checkmarkCircleOutline });
  }

  ingresar(evento: SubmitEvent): void {
    evento.preventDefault();
    this.reparaService.rolActivo = this.rol;
    void this.router.navigateByUrl('/tabs/solicitudes');
  }
}
