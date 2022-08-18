import { Component, OnInit } from '@angular/core';
import { InitiativeRoll } from '../../../../models/IniciativeRoll';

@Component({
  selector: 'app-initiative-list',
  templateUrl: './initiative-list.component.html',
  styleUrls: ['./initiative-list.component.scss']
})
export class InitiativeListComponent implements OnInit {

  battleStarted: boolean = false;
  initiativeList: InitiativeRoll[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  startInitiatives(): void {
    this.initiativeList = [];
    this.battleStarted = true;
  }

  addNewInitiative(): void {
    this.initiativeList.push({
      place: this.initiativeList.length < 1 ? 1 : this.initiativeList[this.initiativeList.length - 1].place + 1,
      name: 'Jogador',
      value: 0,
      damage: 0,
    });
  }

  removeInitiative(initiative: InitiativeRoll): void {
    const initiativeIndex = this.initiativeList.findIndex(i => i.place === initiative.place);
    this.initiativeList.splice(initiativeIndex, 1);
    // change place of other initiatives
    for (let index = 0; index < this.initiativeList.length; index++) {
      const initiative = this.initiativeList[index];
      initiative.place = index + 1;
    }
  }

  moveInitiativeDown(initiative: InitiativeRoll): void {
    const initiativeIndex = this.initiativeList.findIndex(i => i.place === initiative.place);
    if (initiativeIndex < this.initiativeList.length - 1) {
      const nextInitiative = this.initiativeList[initiativeIndex + 1];
      this.initiativeList[initiativeIndex + 1] = initiative;
      this.initiativeList[initiativeIndex] = nextInitiative;
      this.initiativeList[initiativeIndex].place = initiativeIndex + 1;
      this.initiativeList[initiativeIndex + 1].place = initiativeIndex +2;
    }
  }

  moveInitiativeUp(initiative: InitiativeRoll): void {
    const initiativeIndex = this.initiativeList.findIndex(i => i.place === initiative.place);
    if (initiativeIndex > 0) {
      const previousInitiative = this.initiativeList[initiativeIndex - 1];
      this.initiativeList[initiativeIndex - 1] = initiative;
      this.initiativeList[initiativeIndex] = previousInitiative;
      this.initiativeList[initiativeIndex].place = initiativeIndex +1;
      this.initiativeList[initiativeIndex - 1].place = initiativeIndex;
    }
  }

  changeReadOnly(initiativeInput): void {
    var readOnly = (<HTMLInputElement>initiativeInput.target).readOnly;
    if (readOnly) {
      initiativeInput.target.readOnly = false;
    }
    else {
      initiativeInput.target.readOnly = true;
    }
  }

  rebootIniciative(): void {
    this.initiativeList = [];
    this.battleStarted = false;
  }

}
