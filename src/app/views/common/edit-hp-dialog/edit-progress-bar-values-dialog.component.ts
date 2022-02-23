import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICharacter } from 'src/models/Character';
import { CharactersService } from '../../characters/shared/services/characters.service';

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
    @Inject(MAT_DIALOG_DATA) public data: {character:ICharacter, isHP:boolean},
    private charactersService: CharactersService,
    ) {
      if (this.data.isHP) {
        this.value = this.data.character.hp;
        this.maxLimit = this.data.character.maxHp;
      }
      else {
        this.value = this.data.character.sanity;
        this.maxLimit = this.data.character.maxSanity;
      }
    }

  ngOnInit(): void {
  }

  updateValues(currentValue: number, limit: number){
    currentValue = +currentValue;
    limit = +limit;

    if (this.data.isHP) {
      this.charactersService.updateHp(currentValue, limit, this.data.character);
    }
    else {
      this.charactersService.updateSanity(currentValue, limit, this.data.character);
    }
    this.dialogRef.close();
  }

}
