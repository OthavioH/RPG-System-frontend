import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CharactersService } from '../../characters/shared/services/characters.service';

@Component({
  selector: 'app-create-character-dialog',
  templateUrl: './create-character-dialog.component.html',
  styleUrls: ['./create-character-dialog.component.scss']
})
export class CreateCharacterDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateCharacterDialogComponent>, private charactersService: CharactersService) { }

  ngOnInit(): void {
  }

  async onConfirmClicked(characterName: string) {

    if (characterName.length > 0) {
      this.charactersService.createNewCharacter(characterName);
    }
    this.dialogRef.close();
  }
}
