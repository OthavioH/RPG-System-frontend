import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsService } from 'src/app/game-settings.service';
import { ICharacter } from 'src/models/Character';
import { IRitual } from 'src/models/Ritual';
import { CharactersService } from '../../characters/shared/services/characters.service';

@Component({
  selector: 'app-choose-rituals-dialog',
  templateUrl: './choose-rituals-dialog.component.html',
  styleUrls: ['./choose-rituals-dialog.component.scss']
})
export class ChooseRitualsDialogComponent implements OnInit {

  chooseRitualList:IRitual[] = [];
  selectedRitualList: IRitual[] = [];
  gameSettingsRitualList:IRitual[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChooseRitualsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {character:ICharacter},
    public gameSettingsService: GameSettingsService,
    public charactersService: CharactersService,
    ) {
      
    }

  ngOnInit(): void {
    
    this.initLists();
  }

  async initLists() {
    this.gameSettingsRitualList = (await this.gameSettingsService.getGameSettings()).rituals;

    this.chooseRitualList = await this.concatRitualList(this.gameSettingsRitualList, this.data.character.rituals);
  }

  async concatRitualList<T>(firstList, secondList): Promise<T[]> {
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

  async onSelectRitual(selectedAbility: IRitual){
    if (this.selectedRitualList.includes(selectedAbility)) {
      this.selectedRitualList = this.selectedRitualList.filter(ability => ability.id != selectedAbility.id);
    }
    else {
      this.selectedRitualList.push(selectedAbility);
    }
  }

  async saveNewRitualList(){
    if (this.selectedRitualList.length > 0) {
      this.data.character.rituals = [ ...this.selectedRitualList, ...this.data.character.rituals ?? []]
      this.charactersService.updateCharacter(this.data.character);
    }
    this.dialogRef.close();
  }

}
