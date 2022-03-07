import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { GameSettingsService } from 'src/app/game-settings.service';
import { IGameSettings } from 'src/models/GameSettings';
import { generateRandomId } from '../view_utils';

@Component({
  selector: 'app-roll-dice-dialog',
  templateUrl: './roll-dice-dialog.component.html',
  styleUrls: ['./roll-dice-dialog.component.scss'],
})
export class RollDiceDialogComponent implements OnInit {

  showCooldownError:boolean;
  currentState = 'noDice';
  
  diceTimer:number;
  diceMaxCooldown:number;
  diceInScreenTime:number;

  diceDiv:any;

  diceResult:string = '';

  gameSettings:IGameSettings;

  @Input() characterName:string;

  constructor(private gameSettingsService: GameSettingsService, private ngZone: NgZone) {
    this.showCooldownError = false;
  }

  async initVariables() {
    this.gameSettings = await this.gameSettingsService.getGameSettings();
    this.diceMaxCooldown = this.gameSettings.diceCooldown;
    this.diceTimer = this.diceMaxCooldown -1;
    this.diceInScreenTime = this.gameSettings.diceScreenTime -1;
  }

  ngOnInit(): void {
    this.initVariables();
  }

  changeDiceAnimationState(): void {
    this.currentState = this.currentState === 'noDice' ? 'runningDice' : 'noDice';
  }

  rollDice(diceFaces: number, diceQuantity:number, diceDiv:any): void {
    this.diceDiv = diceDiv;
    if (this.diceTimer == this.diceMaxCooldown -1) {
      this.changeDiceAnimationState();
      this.showCooldownError = false;
      this.diceResult = '';
      let result:number = 0;
      let randomNumber = this.getRandom(diceFaces);
      if (diceQuantity <= 1) {
        this.diceResult += ` ${randomNumber}`;
      }
      else {
        for (let i = 1; i <= diceQuantity; i++) {
          this.diceResult += ` ${randomNumber}${i+1 > diceQuantity ? '' : ' +'} `;
          result += randomNumber;
          randomNumber = this.getRandom(diceFaces);
        }
        this.diceResult += `= ${result}`;
      }
      this.gameSettingsService.addNewRoll({id:generateRandomId(),characterName:this.characterName,diceResult:`${this.diceResult}`, diceFaces:diceFaces});
      this.timerCount();
    }
    else {
      this.showCooldownError = true;
    }
  }

  async timerCount() {
    const diceScreenTimeInterval = setInterval(() =>{
      this.diceInScreenTime--;
      if (this.diceInScreenTime < 0) {
        this.diceInScreenTime = this.gameSettings.diceScreenTime -1;
        clearInterval(diceScreenTimeInterval);
        this.changeDiceAnimationState();
      }
    },1000);

    const diceTimerInterval = setInterval(() =>{
      this.diceTimer--;
      if (this.diceTimer < 0) {
        this.diceTimer = this.diceMaxCooldown -1;
        clearInterval(diceTimerInterval);
      }
    },1000);

  }

  getRandom(max: number): number {
    return Math.floor( Math.random() * max + 1);
  }

}
