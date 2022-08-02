import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IWeapon } from 'src/models/Weapon';
import { DeleteWeapon, EditWeapon } from '../../../../models/EditWeaponDialogAction';

@Component({
  selector: 'app-edit-weapon-dialog',
  templateUrl: './edit-weapon-dialog.component.html',
  styleUrls: ['./edit-weapon-dialog.component.scss']
})
export class EditWeaponDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditWeaponDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public weapon: IWeapon,
  ) { }

  ngOnInit(): void {
    console.log(this.weapon);

  }

  saveChanges(): void {
    this.dialogRef.close(new EditWeapon(this.weapon));
  }

  deleteWeapon(): void {
    // send delete action
    this.dialogRef.close(new DeleteWeapon(this.weapon));
  }

}
