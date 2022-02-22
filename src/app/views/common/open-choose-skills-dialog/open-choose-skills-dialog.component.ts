import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsService } from 'src/app/game-settings.service';
import { ICharacter } from 'src/model/Character';
import { ISkill } from 'src/model/Skill';
import { CharactersService } from '../../characters/shared/services/characters.service';

@Component({
  selector: 'app-open-choose-skills-dialog',
  templateUrl: './open-choose-skills-dialog.component.html',
  styleUrls: ['./open-choose-skills-dialog.component.scss']
})
export class OpenChooseSkillsDialogComponent implements OnInit {

  
  chooseSkillList:ISkill[] = [];
  selectedSkillList: ISkill[] = [];
  gameSettingsSkillList:ISkill[] = [];

  constructor(
    public dialogRef: MatDialogRef<OpenChooseSkillsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {character:ICharacter},
    public gameSettingsService: GameSettingsService,
    public charactersService: CharactersService,
    ) {
      
    }

  ngOnInit(): void {
    
    this.initLists();
  }

  async initLists() {
    this.gameSettingsSkillList = (await this.gameSettingsService.getGameSettings()).skills;

    this.chooseSkillList = await this.concatSkillList(this.gameSettingsSkillList, this.data.character.skills);
  }

  async concatSkillList<T>(firstList, secondList): Promise<T[]> {
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

  async onSelectSkill(selectedSkill: ISkill){
    if (this.selectedSkillList.includes(selectedSkill)) {
      this.selectedSkillList = this.selectedSkillList.filter(skill => skill.id != selectedSkill.id);
    }
    else {
      this.selectedSkillList.push(selectedSkill);
    }
  }

  async saveNewSkillList(){
    if (this.selectedSkillList.length > 0) {
      this.data.character.skills = this.data.character.skills != null 
                                  ? await this.concatSkillList(this.selectedSkillList, this.data.character.skills) 
                                  : this.selectedSkillList;
      this.charactersService.updateCharacter(this.data.character);
    }
    this.dialogRef.close();
  }

}
