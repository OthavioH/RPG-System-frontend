import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAttribute } from 'src/model/Attribute';

@Component({
  selector: 'app-attribute-dialog',
  templateUrl: './attribute-dialog.component.html',
  styleUrls: ['./attribute-dialog.component.scss']
})
export class AttributeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AttributeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public attribute: IAttribute,) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
