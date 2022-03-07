import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRitual } from 'src/models/Ritual';

@Component({
  selector: 'app-show-ritual-dialog',
  templateUrl: './show-ritual-dialog.component.html',
  styleUrls: ['./show-ritual-dialog.component.scss']
})
export class ShowRitualDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowRitualDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public ritual: IRitual,) { }

  ngOnInit(): void {
  }

  scrollToTitle(element: HTMLElement): void {
    element.scrollIntoView();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
