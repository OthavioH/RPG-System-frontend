import { Component, Input, NgZone, OnInit, SimpleChanges } from '@angular/core';
import { GameSettingsService } from 'src/app/game-settings.service';
import { IGameSettings } from 'src/models/GameSettings';
import { generateRandomId } from '../../view_utils';
import { MatDialog } from '@angular/material/dialog';
import { RollAttributeDialogComponent } from '../../roll-attribute-dialog/roll-attribute-dialog.component';

@Component({
  selector: 'app-roll-dice-dialog',
  templateUrl: './roll-dice-dialog.component.html',
  styleUrls: ['./roll-dice-dialog.component.scss'],
})
export class RollDiceDialogComponent implements OnInit {
  showCooldownError: boolean;
  currentState = 'noDice';

  diceTimer: number;
  diceMaxCooldown: number;
  diceInScreenTime: number;
  timestamp: number;

  gameSettings: IGameSettings;

  @Input() characterName: string;

  constructor(
    private gameSettingsService: GameSettingsService,
    private ngZone: NgZone,
    private dialogService: MatDialog
  ) {
    this.showCooldownError = false;
    this.gameSettingsService.getGameSettings().then((gameSettings) => {
      this.gameSettings = gameSettings;
      this.diceMaxCooldown = gameSettings.diceCooldown;
      this.diceInScreenTime = gameSettings.diceScreenTime - 1;
    });
  }

  ngOnInit(): void {
    this.timestamp = Date.now();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.timestamp = Date.now();
  }

  changeDiceAnimationState(): void {
    this.currentState =
      this.currentState === 'noDice' ? 'runningDice' : 'noDice';
  }

  async rollDice(diceFaces: string) {
    const diceFacesArray = diceFaces.split('d');
    const diceFacesCount = Number(diceFacesArray[0]);
    const diceFacesMax = Number(diceFacesArray[1]);

    const diceResultList: number[] = [];

    for (let i = 0; i < diceFacesCount; i++) {
      diceResultList.push(this.getRandom(diceFacesMax));
    }

    diceResultList.forEach(async (dice) => {
      let id = generateRandomId();

      await this.gameSettingsService.addNewRoll({
        id: id,
        characterName: this.characterName,
        diceResult: dice,
        diceFaces: diceFacesMax,
      });
    });

    this.dialogService.open(RollAttributeDialogComponent, {
      data: {
        diceResultList: diceResultList,
        hasToSum: true,
      },
    });
  }

  getRandom(max: number): number {
    return Math.floor(Math.random() * max + 1);
  }
}
