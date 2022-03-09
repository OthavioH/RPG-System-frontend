import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  diceResult:number;

  gameSettings:IGameSettings;

  @Input() characterName:string;
  gameId:string;

  constructor(private gameSettingsService: GameSettingsService, private ngZone: NgZone,private activatedRoute:ActivatedRoute) {
    this.showCooldownError = false;
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      this.gameId = paramMap.get('id');
    });
  }

  async initVariables() {
    this.gameSettings = await this.gameSettingsService.getGameSettings(this.gameId);

    this.diceMaxCooldown = this.gameSettings.diceCooldown;

    this.diceTimer = this.diceMaxCooldown -1;
    this.diceInScreenTime = this.gameSettings.diceScreenTime -1;

    this.gameSettingsService.onNewTimerEmitted$.subscribe((timer)=>{
      if (timer >= this.diceMaxCooldown -1) {
        this.showCooldownError = false;
      }
      this.diceTimer = timer;
      
    });
  }

  ngOnInit(): void {
    this.initVariables();
  }

  changeDiceAnimationState(): void {
    this.currentState = this.currentState === 'noDice' ? 'runningDice' : 'noDice';
  }

  rollDice(diceFaces: number, ): void {
    if (this.diceTimer == this.diceMaxCooldown -1) {
      this.changeDiceAnimationState();

      this.showCooldownError = false;
      this.diceResult = this.getRandom(diceFaces);

      this.gameSettingsService.addNewRoll({id:generateRandomId(),characterName:this.characterName,diceResult:this.diceResult, diceFaces:diceFaces});
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
      this.gameSettingsService.emitTimer(this.diceTimer >= 0 ? this.diceTimer : this.diceMaxCooldown -1);
    },1000);

  }

  getRandom(max: number): number {
    return Math.floor( Math.random() * max + 1);
  }

}
