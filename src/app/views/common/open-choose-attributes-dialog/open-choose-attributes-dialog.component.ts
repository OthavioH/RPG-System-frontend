import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsService } from 'src/app/game-settings.service';
import { IAttribute } from 'src/model/Attribute';
import { ICharacter } from 'src/model/Character';
import { CharactersService } from '../../characters/shared/services/characters.service';

@Component({
  selector: 'app-open-choose-attributes-dialog',
  templateUrl: './open-choose-attributes-dialog.component.html',
  styleUrls: ['./open-choose-attributes-dialog.component.scss']
})
export class OpenChooseAttributesDialogComponent implements OnInit {

  chooseAttributeList:IAttribute[] = [];
  selectedAttributeList: IAttribute[] = [];
  gameSettingsAttributeList:IAttribute[] = [];

  constructor(
    public dialogRef: MatDialogRef<OpenChooseAttributesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {character:ICharacter},
    public gameSettingsService: GameSettingsService,
    public charactersService: CharactersService,
    ) {
      
    }

  ngOnInit(): void {
    
    this.initLists();
  }

  async initLists() {
    this.gameSettingsAttributeList = (await this.gameSettingsService.getGameSettings()).attributes;

    this.chooseAttributeList = await this.concatAttributeList(this.gameSettingsAttributeList, this.data.character.attributes);
  }

  async onSelectAttribute(selectedAttribute: IAttribute){
    if (this.selectedAttributeList.includes(selectedAttribute)) {
      this.selectedAttributeList = this.selectedAttributeList.filter(attribute => attribute.id != selectedAttribute.id);
    }
    else {
      this.selectedAttributeList.push(selectedAttribute);
    }
  }

  async saveNewAttributeList(){
    if (this.selectedAttributeList.length > 0) {
      this.data.character.attributes = this.data.character.attributes != null 
      ? await this.concatAttributeList(this.selectedAttributeList, this.data.character.attributes) 
      : this.selectedAttributeList;
      this.charactersService.updateCharacter(this.data.character);
    }
    this.dialogRef.close();
  }

  async concatAttributeList<T>(firstList, secondList): Promise<T[]> {
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

}
