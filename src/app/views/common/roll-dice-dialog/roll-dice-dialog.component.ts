import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roll-dice-dialog',
  templateUrl: './roll-dice-dialog.component.html',
  styleUrls: ['./roll-dice-dialog.component.scss']
})
export class RollDiceDialogComponent implements OnInit {

  diceResult:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  rollDice(diceFaces: number, diceQuantity:number): void {
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
  }

  getRandom(max: number): number {
    return Math.floor( Math.random() * max + 1);
  }

}
