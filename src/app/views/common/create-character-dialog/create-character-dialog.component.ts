import { Component, OnInit } from '@angular/core';
import { MatDialogRef,} from '@angular/material/dialog';
import { DashboardService } from '../../dashboard/shared/services/dashboard.service';

@Component({
  selector: 'app-create-character-dialog',
  templateUrl: './create-character-dialog.component.html',
  styleUrls: ['./create-character-dialog.component.scss']
})
export class CreateCharacterDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateCharacterDialogComponent>, private dashboardService: DashboardService) { }

  ngOnInit(): void {
  }

  async onConfirmClicked(characterName: string) {
    
    if (characterName.length > 0) {
      this.dashboardService.createNewCharacter(characterName);
    }
    this.dialogRef.close();
  }
}
