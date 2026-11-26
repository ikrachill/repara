import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { SolicitudesPage } from './solicitudes.page';

describe('SolicitudesPage', () => {
  it('muestra la carga y permite reintentar después de un error', async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const http = TestBed.inject(HttpTestingController);
    const fixture = TestBed.createComponent(SolicitudesPage);
    fixture.detectChanges();

    const pagina = fixture.nativeElement as HTMLElement;
    expect(pagina.querySelector('ion-spinner')).not.toBeNull();
    http.expectOne(environment.urlRepara).flush(null, { status: 500, statusText: 'Error' });
    await fixture.whenStable();
    expect(pagina.querySelector('[role="alert"]')?.textContent).toContain('No se pudieron cargar');

    pagina.querySelector('ion-button')?.click();
    http.expectOne(environment.urlRepara).flush({
      solicitudes: [{
        id: 1,
        cliente: 'Ana Duarte',
        equipo: 'Notebook',
        descripcion: 'La batería se descarga.',
        fecha: '2026-11-20',
        estado: 'pendiente',
      }],
      presupuestos: [],
      seguimientos: [],
    });
    await fixture.whenStable();

    expect(pagina.querySelector('ion-item')?.textContent).toContain('Notebook');
    expect(pagina.querySelector('ion-spinner')).toBeNull();
    expect(pagina.querySelector('[role="alert"]')).toBeNull();
    http.verify();
  });
});
