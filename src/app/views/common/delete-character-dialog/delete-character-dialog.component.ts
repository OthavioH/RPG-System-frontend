import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DashboardService } from '../../dashboard/shared/services/dashboard.service';

@Component({
  selector: 'app-delete-character-dialog',
  templateUrl: './delete-character-dialog.component.html',
  styleUrls: ['./delete-character-dialog.component.scss']
})
export class DeleteCharacterDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteCharacterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public characterId: number,
    public dashboardService: DashboardService,
    ) { }

  ngOnInit(): void {
  }

  async onConfirmButtonClicked() {
    await this.dashboardService.deleteById(this.characterId);
    this.closeDialog();
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
