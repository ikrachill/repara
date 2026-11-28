import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { IonBadge, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { constructOutline, receiptOutline, timeOutline } from 'ionicons/icons';

import { ReparaService } from '../services/repara.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [NgIf, IonBadge, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  constructor(readonly reparaService: ReparaService) {
    addIcons({ constructOutline, receiptOutline, timeOutline });
  }
}
