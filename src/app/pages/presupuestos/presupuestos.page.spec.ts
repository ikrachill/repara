import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { PresupuestosPage } from './presupuestos.page';

describe('PresupuestosPage', () => {
  it('muestra el equipo asociado al presupuesto tras reintentar', async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const http = TestBed.inject(HttpTestingController);
    const fixture = TestBed.createComponent(PresupuestosPage);
    fixture.detectChanges();

    const pagina = fixture.nativeElement as HTMLElement;
    expect(pagina.querySelector('ion-spinner')).not.toBeNull();
    http.expectOne(environment.urlRepara).flush(null, { status: 500, statusText: 'Error' });
    await fixture.whenStable();
    expect(pagina.querySelector('[role="alert"]')?.textContent).toContain('No se pudieron cargar');

    pagina.querySelector('ion-button')?.click();
    http.expectOne(environment.urlRepara).flush({
      solicitudes: [{ id: 1, equipo: 'Notebook' }],
      presupuestos: [{
        id: 2,
        solicitudId: 1,
        tecnico: 'Diego Ortiz',
        detalle: 'Cambio de batería.',
        monto: 380000,
        estado: 'aceptado',
      }],
      seguimientos: [],
    });
    await fixture.whenStable();

    expect(pagina.querySelector('ion-card-title')?.textContent).toContain('Notebook');
    expect(pagina.querySelector('ion-badge')?.textContent).toContain('aceptado');
    expect(pagina.querySelector('ion-spinner')).toBeNull();
    expect(pagina.querySelector('[role="alert"]')).toBeNull();
    http.verify();
  });
});
