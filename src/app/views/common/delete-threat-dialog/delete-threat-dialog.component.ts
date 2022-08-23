import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThreatService } from '../create-threat-dialog/threat.service';
import { Threat } from '../../../../models/Threat';

@Component({
  selector: 'app-delete-threat-dialog',
  templateUrl: './delete-threat-dialog.component.html',
  styleUrls: ['./delete-threat-dialog.component.scss'],
})
export class DeleteThreatDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteThreatDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { threatId: string; deleteThreatEvent: EventEmitter<string> },
    private threatService: ThreatService
  ) {}

  ngOnInit(): void {}

  async deleteThreat(threatId: string): Promise<void> {
    this.data.deleteThreatEvent.emit(threatId);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onConfirmButtonClicked(): void {
    this.deleteThreat(this.data.threatId.toString());
    this.closeDialog();
  }
}
