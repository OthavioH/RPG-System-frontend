import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsService } from 'src/app/game-settings.service';
import { IAbility } from 'src/models/Ability';

@Component({
  selector: 'app-edit-ability-dialog',
  templateUrl: './edit-ability-dialog.component.html',
  styleUrls: ['./edit-ability-dialog.component.scss']
})
export class EditAbilityDialogComponent implements OnInit {

  ability : IAbility;

  constructor(
    public dialogRef: MatDialogRef<EditAbilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAbility,
    private gameSettingsService: GameSettingsService,
    ) {
      
    }

  ngOnInit(): void {
    this.ability = this.data;
  }

  editAbility(name: string, description: string,): void {
    
    this.gameSettingsService.editAbility(name,description,this.ability.id);
    this.close();
    
  }

  ngOnDestroy(): void {
    this.ability = null;
  }

  close(): void {
    this.dialogRef.close();
  }

}
