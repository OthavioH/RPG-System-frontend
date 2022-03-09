import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICharacter } from 'src/models/Character';
import { DashboardService } from '../../dashboard/shared/services/dashboard.service';

@Component({
  selector: 'app-change-character-image-dialog',
  templateUrl: './change-character-image-dialog.component.html',
  styleUrls: ['./change-character-image-dialog.component.scss']
})
export class ChangeCharacterImageDialogComponent implements OnInit {

  defaultImgUrl:string = '/../../assets/unknown_character_transparent.png';
  imgUrl:string;

  constructor(public dialogRef: MatDialogRef<ChangeCharacterImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {character:ICharacter,gameId:string},
    private dashboardService: DashboardService,) { }

  ngOnInit(): void {
    this.imgUrl = this.data.character.profileImageUrl ?? this.defaultImgUrl;
  }

  onImageError(event) {
    event.target.src = this.defaultImgUrl;
  }

  changeImage(newImgUrl:string):void {
    this.data.character.profileImageUrl = newImgUrl != '' ? newImgUrl : '';
    this.dashboardService.updateCharacter(this.data.character,this.data.gameId);
    this.close();
  }

  close():void {
    this.dialogRef.close();
  }

}
