import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICharacter } from 'src/models/Character';
import { DashboardService } from '../../dashboard/shared/services/dashboard.service';
import { generateRandomId } from '../view_utils';

@Component({
  selector: 'app-create-equipment-dialog',
  templateUrl: './create-equipment-dialog.component.html',
  styleUrls: ['./create-equipment-dialog.component.scss']
})
export class CreateEquipmentDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateEquipmentDialogComponent>,
    private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: {character:ICharacter,gameId:string}
    ) { }

  ngOnInit(): void {
  }

  async onConfirmClicked(itemName: string,) {
    this.dialogRef.close();
    if (itemName.length > 0) {
      const newItem = {id:generateRandomId(), name:itemName, quantity:0,details:'', prestige:'',slots:0};
      if (this.data.character.inventory.items != null) {
        this.data.character.inventory.items.push(newItem)
      } else {
        this.data.character.inventory.items = [newItem];
      }
      await this.dashboardService.updateCharacter(this.data.character,this.data.gameId);
    }
  }
  
}
