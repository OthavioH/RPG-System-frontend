import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaracthersService } from '../../characters/shared/services/characters.service';

@Component({
  selector: 'app-create-character-dialog',
  templateUrl: './create-character-dialog.component.html',
  styleUrls: ['./create-character-dialog.component.scss']
})
export class CreateCharacterDialogComponent implements OnInit {

  characterName: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateCharacterDialogComponent>, private charactersService: CaracthersService) { }

  ngOnInit(): void {
  }

  onChangeCharacterName(value:string): void {
    this.characterName = value;
  }

  onConfirmClicked(): void {
    if (this.characterName.length > 0) {
      this.charactersService.createNewCharacter(this.characterName);
    }
    this.dialogRef.close();
  }
}
