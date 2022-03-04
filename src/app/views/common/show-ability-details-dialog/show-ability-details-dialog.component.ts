import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAbility } from 'src/models/Ability';

@Component({
  selector: 'app-show-ability-details-dialog',
  templateUrl: './show-ability-details-dialog.component.html',
  styleUrls: ['./show-ability-details-dialog.component.scss']
})
export class ShowAbilityDetailsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowAbilityDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public ability: IAbility,) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
