import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
  timestamp: number = 0;
  diceInScreenTime: number = 0;
  strResult: string = 'Resultado: ';

  gameSettings: IGameSettings;

  constructor(
    public dialogRef: MatDialogRef<RollAttributeDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { diceResultList: number[]; hasToSum: boolean },
    private gameSettingsService: GameSettingsService
  ) {
    this.timestamp = Date.now();
  }

  ngOnInit(): void {
    this.initVariables();
  }

  async initVariables() {
    await this.gameSettingsService.getGameSettings().then((gameSettings) => {
      this.gameSettings = gameSettings;

      if (this.data.diceResultList.length < 1 && !this.data.hasToSum) {
        this.strResult += `${Math.min(...this.data.diceResultList)}.`;
      } else if (this.data.diceResultList.length == 1 && !this.data.hasToSum) {
        this.strResult += `${this.data.diceResultList[0]}.`;
      } else if (!this.data.hasToSum) {
        this.strResult += `${Math.max(...this.data.diceResultList)}.`;
      } else {
        let total = 0;
        for (let i = 0; i < this.data.diceResultList.length; i++) {
          const number = this.data.diceResultList[i];
          total += number;
        }

        this.strResult += `${total}.`;
      }

      this.diceInScreenTime = this.gameSettings.diceScreenTime - 1;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.timestamp = Date.now();
  }
}
