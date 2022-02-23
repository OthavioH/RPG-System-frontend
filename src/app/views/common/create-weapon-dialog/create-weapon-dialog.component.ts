import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICharacter } from 'src/models/Character';
import { CharactersService } from '../../characters/shared/services/characters.service';
import { generateRandomId } from '../view_utils';

@Component({
  selector: 'app-create-weapon-dialog',
  templateUrl: './create-weapon-dialog.component.html',
  styleUrls: ['./create-weapon-dialog.component.scss']
})
export class CreateWeaponDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateWeaponDialogComponent>,
    private charactersService: CharactersService,
    @Inject(MAT_DIALOG_DATA) public data: {character:ICharacter}
    ) { }

  ngOnInit(): void {
  }

  async onConfirmClicked(weaponName: string, damage:string, criticalDamage:string, type:string) {
    this.dialogRef.close();
    if (weaponName.length > 0) {
      this.data.character.weapons.push(
        {
          id:generateRandomId(), 
          name:weaponName, 
          damage:damage, 
          criticalDamage:criticalDamage, 
          type:type,
          currentAmmo:0,
          maxAmmo:0,
          attacksQuantity:0,
          malfunction:0,
          range:0,
          rangeInArea:0,
        }
      );
      await this.charactersService.updateCharacter(this.data.character);
    }
    
  }
}
