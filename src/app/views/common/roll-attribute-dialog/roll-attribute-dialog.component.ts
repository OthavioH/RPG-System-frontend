import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsService } from 'src/app/game-settings.service';
import { IGameSettings } from 'src/models/GameSettings';
import { generateRandomId } from '../view_utils';

@Component({
  selector: 'app-roll-attribute-dialog',
  templateUrl: './roll-attribute-dialog.component.html',
  styleUrls: ['./roll-attribute-dialog.component.scss'],
})
export class RollAttributeDialogComponent implements OnInit {

  timestamp:number;
  diceInScreenTime:number;
  strResult: string = "Resultado: ";

  gameSettings: IGameSettings;

  constructor(public dialogRef: MatDialogRef<RollAttributeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public diceResultList:number[],
    private gameSettingsService: GameSettingsService,
  ) { }

  ngOnInit(): void {

    this.initVariables();

  }

  getRandom(max: number): number {
    return Math.floor( Math.random() * max + 1);
  }

  async initVariables() {
    this.gameSettings = await this.gameSettingsService.getGameSettings();

    if (this.diceResultList.length < 1) {
      this.strResult += `${Math.min(...this.diceResultList)}.`;
    }
    else if (this.diceResultList.length == 1){
      this.strResult += `${this.diceResultList[0]}.`;
    }
    else {
      this.strResult += `${Math.max(...this.diceResultList)}.`;
    }

    this.diceInScreenTime = this.gameSettings.diceScreenTime -1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.timestamp = Date.now();
  }

}
