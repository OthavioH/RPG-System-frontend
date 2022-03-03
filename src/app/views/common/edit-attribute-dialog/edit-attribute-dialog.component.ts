import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsService } from 'src/app/game-settings.service';
import { ISkill } from 'src/models/Skill';
import { IAttribute } from 'src/models/Attribute';

@Component({
  selector: 'app-edit-attribute-dialog',
  templateUrl: './edit-attribute-dialog.component.html',
  styleUrls: ['./edit-attribute-dialog.component.scss']
})
export class EditAttributeDialogComponent implements OnInit {

  attribute : IAttribute;

  constructor(
    public dialogRef: MatDialogRef<EditAttributeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAttribute,
    private gameSettingsService: GameSettingsService,
    ) {
      
    }

  ngOnInit(): void {
    this.attribute = this.data;
  }

  editAttribute(name: string, abbreviation: string,): void {
    
    this.gameSettingsService.editAttribute(name,abbreviation,this.attribute.id);
      this.close();
    this.attribute.id;
    
  }

  ngOnDestroy(): void {
    this.attribute = null;
  }

  close(): void {
    this.dialogRef.close();
  }

}
