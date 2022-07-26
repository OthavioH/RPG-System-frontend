import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICharacter } from 'src/models/Character';
import { InventoryItem } from 'src/models/InventoryItem';

@Component({
  selector: 'app-edit-inventory-dialog',
  templateUrl: './edit-inventory-dialog.component.html',
  styleUrls: ['./edit-inventory-dialog.component.scss']
})
export class EditInventoryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditInventoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {item:InventoryItem, character: ICharacter}) { }

  ngOnInit(): void {
  }

  async removeItem(): Promise<void> {
    this.data.character.inventory.items = this.data.character.inventory.items.filter(item => item.id != this.data.item.id);
    this.data.character.saveCharacter();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
