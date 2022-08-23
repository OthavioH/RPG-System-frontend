import { Component, OnInit } from '@angular/core';
import { Threat } from '../../../models/Threat';

@Component({
  selector: 'app-threats-dashboard',
  templateUrl: './threats-dashboard.component.html',
  styleUrls: ['./threats-dashboard.component.scss'],
})
export class ThreatsDashboardComponent implements OnInit {
  threatList: Threat[] = [];

  constructor() {
    this.threatList.push({ id: '1', name: 'threat 1' });
  }

  ngOnInit(): void {}
}
