import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsService } from 'src/app/game-settings.service';
import { ISkill } from 'src/models/Skill';
import { IAttribute } from 'src/models/Attribute';

@Component({
  selector: 'app-edit-game-preference-dialog',
  templateUrl: './edit-game-preference-dialog.component.html',
  styleUrls: ['./edit-game-preference-dialog.component.scss']
})
export class EditGamePreferenceDialogComponent implements OnInit {

  gamePreference : ISkill | IAttribute;

  constructor(
    public dialogRef: MatDialogRef<EditGamePreferenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gameSettingsService: GameSettingsService,
    ) {
      
    }

  ngOnInit(): void {
    this.gamePreference = this.data.gamePreference;
  }

  editPreference(name: string, description:string,): void {
    
    if(this.data.isSkill){
      this.gameSettingsService.editSkill(name,description,this.gamePreference.id);
      this.close();
    }
    else {
      this.gameSettingsService.editAttribute(name,description,this.gamePreference.id);
      this.close();
    }
    this.gamePreference.id;
    
  }

  ngOnDestroy(): void {
    this.gamePreference = null;
  }

  close(): void {
    this.dialogRef.close();
  }

}
