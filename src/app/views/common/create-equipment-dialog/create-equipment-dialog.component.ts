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

  async onConfirmClicked(equipmentName: string, quantity:number) {
    this.dialogRef.close();
    if (equipmentName.length > 0) {
      this.data.character.equipments.push({id:generateRandomId(), name:equipmentName, quantity:quantity});
      await this.charactersService.updateCharacter(this.data.character);
    }
    
  }

}
