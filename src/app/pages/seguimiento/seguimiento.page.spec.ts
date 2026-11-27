import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { SeguimientoPage } from './seguimiento.page';

describe('SeguimientoPage', () => {
  it('muestra el equipo y la novedad más reciente tras reintentar', async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const http = TestBed.inject(HttpTestingController);
    const fixture = TestBed.createComponent(SeguimientoPage);
    fixture.detectChanges();

    const pagina = fixture.nativeElement as HTMLElement;
    expect(pagina.querySelector('ion-spinner')).not.toBeNull();
    http.expectOne(environment.urlRepara).flush(null, { status: 500, statusText: 'Error' });
    await fixture.whenStable();
    expect(pagina.querySelector('[role="alert"]')?.textContent).toContain('No se pudieron cargar');

    pagina.querySelector('ion-button')?.click();
    http.expectOne(environment.urlRepara).flush({
      solicitudes: [{ id: 1, equipo: 'Notebook' }],
      seguimientos: [{
        id: 2,
        solicitudId: 1,
        fecha: '2026-11-24',
        detalle: 'Cambio de batería.',
      }, {
        id: 3, solicitudId: 1, fecha: '2026-11-25', detalle: 'Equipo listo.',
      }],
      presupuestos: [],
    });
    await fixture.whenStable();

    expect(pagina.querySelector('ion-item h2')?.textContent).toContain('Notebook');
    expect(pagina.querySelector('ion-item p')?.textContent).toContain('Equipo listo.');
    expect(pagina.querySelector('ion-spinner')).toBeNull();
    expect(pagina.querySelector('[role="alert"]')).toBeNull();
    http.verify();
  });
});
