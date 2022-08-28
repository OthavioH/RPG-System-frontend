import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICharacter } from 'src/models/Character';
import { CharacterStats } from 'src/models/CharacterStats';
import { CharactersService } from '../../characters/shared/services/characters.service';

@Component({
  selector: 'app-edit-progress-bar-values-dialog',
  templateUrl: './edit-progress-bar-values-dialog.component.html',
  styleUrls: ['./edit-progress-bar-values-dialog.component.scss'],
})
export class EditProgressBarValuesDialogComponent implements OnInit {
  value: number;
  maxLimit: number;

  constructor(
    public dialogRef: MatDialogRef<EditProgressBarValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { currentValue: number; maxValue: number },
    private charactersService: CharactersService
  ) {
    this.value = data.currentValue;
    this.maxLimit = data.maxValue;
  }

  ngOnInit(): void {}

  async updateValues(currentValue: number, limit: number) {
    currentValue = +currentValue;
    limit = +limit;

    this.dialogRef.close({ currentValue: currentValue, maxValue: limit });
  }
}
