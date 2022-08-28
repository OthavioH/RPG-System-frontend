import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Threat, ThreatElement } from '../../../models/Threat';
import { CreateThreatDialogComponent } from '../common/create-threat-dialog/create-threat-dialog.component';
import { ThreatService } from '../common/create-threat-dialog/threat.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-threats-dashboard',
  templateUrl: './threats-dashboard.component.html',
  styleUrls: ['./threats-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ThreatsDashboardComponent implements OnInit {
  threatList: Threat[] = [];

  constructor(
    private modalService: MatDialog,
    private threatService: ThreatService,
    private title: Title
  ) {
    title.setTitle('Threats Dashboard');
  }

  ngOnInit(): void {
    this.initThreatList();
  }

  async initThreatList() {
    this.threatList = await this.threatService.getThreats();
    console.log(this.threatList);
  }

  async deleteThreat(threatId: string) {
    await this.threatService.deleteThreat(threatId);
    this.threatList = await this.threatService.getThreats();
  }

  openCreateThreatDialog() {
    this.modalService.open(CreateThreatDialogComponent, {
      minWidth: '400px',
      minHeight: '400px',
      maxWidth: '600px',
      maxHeight: '600px',
      hasBackdrop: true,
      data: this.threatList,
    });
  }
}
