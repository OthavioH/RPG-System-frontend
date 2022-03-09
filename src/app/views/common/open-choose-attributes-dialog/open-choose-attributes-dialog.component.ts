import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsService } from 'src/app/game-settings.service';
import { IAttribute } from 'src/models/Attribute';
import { ICharacter } from 'src/models/Character';
import { DashboardService } from '../../dashboard/shared/services/dashboard.service';

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
    @Inject(MAT_DIALOG_DATA) public data: {character:ICharacter, gameId:string},
    public gameSettingsService: GameSettingsService,
    public dashboardService: DashboardService,
    ) {
      
    }

  ngOnInit(): void {
    
    this.initLists();
  }

  async initLists() {
    this.gameSettingsAttributeList = (await this.gameSettingsService.getGameSettings(this.data.gameId)).attributes;

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
      this.data.character.attributes = [...this.selectedAttributeList, ...this.data.character.attributes ?? []];
      this.dashboardService.updateCharacter(this.data.character,this.data.gameId);
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
