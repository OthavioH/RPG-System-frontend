import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ISkill } from 'src/model/Skill';
import { CharactersService } from '../../characters/shared/services/characters.service';

@Component({
  selector: 'app-delete-character-dialog',
  templateUrl: './delete-character-dialog.component.html',
  styleUrls: ['./delete-character-dialog.component.scss']
})
export class DeleteCharacterDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteCharacterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public characterId: number,
    public charactersService: CharactersService,
    ) { }

  ngOnInit(): void {
  }

  async onConfirmButtonClicked() {
    await this.charactersService.deleteById(this.characterId);
    this.closeDialog();
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
