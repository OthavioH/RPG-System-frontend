import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsService } from 'src/app/game-settings.service';
import { IAbility } from 'src/models/Ability';
import { ICharacter } from 'src/models/Character';
import { CharactersService } from '../../characters/shared/services/characters.service';

@Component({
  selector: 'app-choose-abilities-dialog',
  templateUrl: './choose-abilities-dialog.component.html',
  styleUrls: ['./choose-abilities-dialog.component.scss']
})
export class ChooseAbilitiesDialogComponent implements OnInit {

  chooseAbilityList:IAbility[] = [];
  selectedAbilityList: string[] = [];
  gameSettingsAbilityList:IAbility[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChooseAbilitiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {character:ICharacter},
    public gameSettingsService: GameSettingsService,
    public charactersService: CharactersService,
    ) {

    }

  ngOnInit(): void {

    this.initLists();
  }

  async initLists() {
    this.gameSettingsAbilityList = (await this.gameSettingsService.getGameSettings()).abilities;

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

  async onSelectAbility(selectedAbility: string){
    if (this.selectedAbilityList.includes(selectedAbility)) {
      this.selectedAbilityList = this.selectedAbilityList.filter(ability => ability != selectedAbility);
    }
    else {
      this.selectedAbilityList.push(selectedAbility);
    }
  }

  async saveNewAbilityList(){
    if (this.selectedAbilityList.length > 0) {
      this.data.character.abilities = [ ...this.selectedAbilityList, ...this.data.character.abilities ?? []]
      this.data.character.saveCharacter();
    }
    this.dialogRef.close();
  }

}
