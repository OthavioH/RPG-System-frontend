import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Threat } from '../../../../models/Threat';
import { DeleteThreatDialogComponent } from '../delete-threat-dialog/delete-threat-dialog.component';

@Component({
  selector: 'app-threats-card',
  templateUrl: './threats-card.component.html',
  styleUrls: ['./threats-card.component.scss'],
})
export class ThreatsCardComponent implements OnInit {
  @Input() threat: Threat;
  @Input() threatList: Threat[];

  @Output() deleteThreat = new EventEmitter<string>();

  defaultImgUrl = '/../../assets/unknown_character_transparent.png';

  constructor(private dialogService: MatDialog) {}

  ngOnInit(): void {}

  onImageError(event: any): void {
    event.target.src = this.defaultImgUrl;
  }

  openDeleteThreatDialog(threatId: string): void {
    this.dialogService.open(DeleteThreatDialogComponent, {
      data: { threatId: threatId, deleteThreatEvent: this.deleteThreat },
    });
  }
}
