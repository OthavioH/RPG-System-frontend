import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICharacter } from 'src/models/Character';
import { CharactersService } from '../../characters/shared/services/characters.service';
import { Threat } from '../../../../models/Threat';

@Component({
  selector: 'app-change-character-image-dialog',
  templateUrl: './change-character-image-dialog.component.html',
  styleUrls: ['./change-character-image-dialog.component.scss'],
})
export class ChangeCharacterImageDialogComponent implements OnInit {
  defaultImgUrl: string = '/../../assets/unknown_character_transparent.png';
  imgUrl: string;

  constructor(
    public dialogRef: MatDialogRef<ChangeCharacterImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.imgUrl = this.data ?? this.defaultImgUrl;
  }

  onImageError(event) {
    event.target.src = this.defaultImgUrl;
  }

  changeImage(newImgUrl: string): void {
    this.imgUrl = newImgUrl != '' ? newImgUrl : '';
    this.close(this.imgUrl);
  }

  close(newImgUrl: string): void {
    this.dialogRef.close(newImgUrl);
  }
}
