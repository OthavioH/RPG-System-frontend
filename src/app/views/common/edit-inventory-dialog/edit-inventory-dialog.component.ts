import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { InventoryItem } from 'src/models/InventoryItem';

@Component({
  selector: 'app-edit-inventory-dialog',
  templateUrl: './edit-inventory-dialog.component.html',
  styleUrls: ['./edit-inventory-dialog.component.scss']
})
export class EditInventoryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditInventoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {item:InventoryItem, deleteInventoryStream: BehaviorSubject<InventoryItem>}) { }

  ngOnInit(): void {
  }

  async removeItem(): Promise<void> {
    await this.data.deleteInventoryStream.next(this.data.item);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
