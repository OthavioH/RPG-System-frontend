import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICharacter } from 'src/models/Character';
import { CharacterStats } from 'src/models/CharacterStats';
import { DashboardService } from '../../dashboard/shared/services/dashboard.service';

@Component({
  selector: 'app-edit-progress-bar-values-dialog',
  templateUrl: './edit-progress-bar-values-dialog.component.html',
  styleUrls: ['./edit-progress-bar-values-dialog.component.scss']
})
export class EditProgressBarValuesDialogComponent implements OnInit {

  value: number;
  maxLimit:number;

  constructor(
    public dialogRef: MatDialogRef<EditProgressBarValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {character:ICharacter, characterStats:CharacterStats},
    private dashboardService: DashboardService,
    ) {
      if (this.data.characterStats == CharacterStats.hp) {
        this.value = this.data.character.hp;
        this.maxLimit = this.data.character.maxHp;
      }
      else if(this.data.characterStats == CharacterStats.sanity){
        this.value = this.data.character.sanity;
        this.maxLimit = this.data.character.maxSanity;
      }
      else {
        this.value = this.data.character.stressPoints;
        this.maxLimit = this.data.character.maxStressPoints;
      }
    }

  ngOnInit(): void {
  }

  updateValues(currentValue: number, limit: number){
    currentValue = +currentValue;
    limit = +limit;

    if (this.data.characterStats == CharacterStats.hp) {
      this.data.character.hp = currentValue;
      this.data.character.maxHp = limit;
    }
    else if(this.data.characterStats == CharacterStats.sanity){
      this.data.character.sanity = currentValue;
      this.data.character.maxSanity = limit;
    }
    else {
      this.data.character.stressPoints = currentValue;
      this.data.character.maxStressPoints = limit;
    }
    this.dashboardService.updateCharacterStats(this.data.character);
    this.dialogRef.close();
  }

}
