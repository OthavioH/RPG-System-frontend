import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsService } from 'src/app/game-settings.service';
import { ISkill } from 'src/models/Skill';

@Component({
  selector: 'app-edit-skill-dialog',
  templateUrl: './edit-skill-dialog.component.html',
  styleUrls: ['./edit-skill-dialog.component.scss']
})
export class EditSkillDialogComponent implements OnInit {

  skill : ISkill;

  constructor(
    public dialogRef: MatDialogRef<EditSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISkill,
    private gameSettingsService: GameSettingsService,
    ) {
      
    }

  ngOnInit(): void {
    this.skill = this.data;
  }

  editSkill(name: string, description: string,): void {
    
    this.gameSettingsService.editSkill(name,description,this.skill.id);
      this.close();
    this.skill.id;
    
  }

  ngOnDestroy(): void {
    this.skill = null;
  }

  close(): void {
    this.dialogRef.close();
  }

}
