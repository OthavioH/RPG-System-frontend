import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { DashboardService } from '../../dashboard/shared/services/dashboard.service';

@Component({
  selector: 'app-create-character-dialog',
  templateUrl: './create-character-dialog.component.html',
  styleUrls: ['./create-character-dialog.component.scss']
})
export class CreateCharacterDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateCharacterDialogComponent>, 
    private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: {gameId:string}
  ) {

    }

  ngOnInit(): void {
  }

  async onConfirmClicked(characterName: string) {
    
    if (characterName.length > 0) {
      this.dashboardService.createNewCharacter(characterName, this.data.gameId);
    }
    this.dialogRef.close();
  }
}
