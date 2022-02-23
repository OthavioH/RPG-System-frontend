import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICharacter } from 'src/models/Character';
import { CharactersService } from '../../characters/shared/services/characters.service';
import { generateRandomId } from '../view_utils';

@Component({
  selector: 'app-create-equipment-dialog',
  templateUrl: './create-equipment-dialog.component.html',
  styleUrls: ['./create-equipment-dialog.component.scss']
})
export class CreateEquipmentDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateEquipmentDialogComponent>,
    private charactersService: CharactersService,
    @Inject(MAT_DIALOG_DATA) public data: {character:ICharacter}
    ) { }

  ngOnInit(): void {
  }

  async onConfirmClicked(itemName: string, quantity:number, weight:number) {
    this.dialogRef.close();
    if (itemName.length > 0) {
      this.data.character.inventory.items.push({id:generateRandomId(), name:itemName, quantity:quantity,weight:weight});
      this.data.character.inventory.weight += weight;
      await this.charactersService.updateCharacter(this.data.character);
    }
    
  }

}
