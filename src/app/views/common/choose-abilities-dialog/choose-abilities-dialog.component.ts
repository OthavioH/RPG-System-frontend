import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsService } from 'src/app/game-settings.service';
import { IAbility } from 'src/models/Ability';
import { ICharacter } from 'src/models/Character';
import { DashboardService } from '../../dashboard/shared/services/dashboard.service';

@Component({
  selector: 'app-choose-abilities-dialog',
  templateUrl: './choose-abilities-dialog.component.html',
  styleUrls: ['./choose-abilities-dialog.component.scss']
})
export class ChooseAbilitiesDialogComponent implements OnInit {

  chooseAbilityList:IAbility[] = [];
  selectedAbilityList: IAbility[] = [];
  gameSettingsAbilityList:IAbility[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChooseAbilitiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {character:ICharacter, gameId:string},
    public gameSettingsService: GameSettingsService,
    public dashboardService: DashboardService,
    ) {
      
    }

  ngOnInit(): void {
    
    this.initLists();
  }

  async initLists() {
    this.gameSettingsAbilityList = (await this.gameSettingsService.getGameSettings(this.data.gameId)).abilities;

    this.chooseAbilityList = await this.concatAbilityList(this.gameSettingsAbilityList, this.data.character.abilities);
  }

  async concatAbilityList<T>(firstList, secondList): Promise<T[]> {
    let newList = new Array<T>();
    if (secondList != null) {
      for (let i = 0; i < firstList.length; i++) {
        let foundMatch:boolean;
        for (let j = 0; j < secondList.length; j++) {
          if (firstList[i].name == secondList[j].name) {
            foundMatch = true;
          } 
        }
        if (!foundMatch) {
          newList.push(firstList[i]);
        }
      }
    }
    else {
      newList = firstList;
    }
    return newList;
  }

  async onSelectAbility(selectedAbility: IAbility){
    if (this.selectedAbilityList.includes(selectedAbility)) {
      this.selectedAbilityList = this.selectedAbilityList.filter(ability => ability.id != selectedAbility.id);
    }
    else {
      this.selectedAbilityList.push(selectedAbility);
    }
  }

  async saveNewAbilityList(){
    if (this.selectedAbilityList.length > 0) {
      this.data.character.abilities = [ ...this.selectedAbilityList, ...this.data.character.abilities ?? []]
      this.dashboardService.updateCharacter(this.data.character,this.data.gameId);
    }
    this.dialogRef.close();
  }

}
