import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICharacter } from 'src/models/Character';
import { DashboardService } from '../../dashboard/shared/services/dashboard.service';
import { generateRandomId } from '../view_utils';

@Component({
  selector: 'app-create-weapon-dialog',
  templateUrl: './create-weapon-dialog.component.html',
  styleUrls: ['./create-weapon-dialog.component.scss']
})
export class CreateWeaponDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateWeaponDialogComponent>,
    private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: {character:ICharacter,gameId:string}
    ) { }

  ngOnInit(): void {
  }

  async onConfirmClicked(weaponName: string) {
    this.dialogRef.close();
    if (weaponName.length > 0) {
      const newWeapon = {id:generateRandomId(), name:weaponName, damage:'',criticalDamage:'', type:'',currentAmmo:0, maxAmmo:'', attack:'', range:'', special:''}
      if (this.data.character.weapons != null) {
        this.data.character.weapons.push(newWeapon);        
      } else {
        this.data.character.weapons = [];
      }
      
      await this.dashboardService.updateCharacter(this.data.character,this.data.gameId);
    }
    
  }
}
