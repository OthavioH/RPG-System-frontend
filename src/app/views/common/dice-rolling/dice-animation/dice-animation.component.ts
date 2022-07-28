import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice-animation',
  templateUrl: './dice-animation.component.html',
  styleUrls: ['./dice-animation.component.scss']
})
export class DiceAnimationComponent implements OnInit {

  @Input() diceImageUrl:string;

  constructor() { }

  ngOnInit(): void {
  }

  reloadImg(): void{
    location.reload();
  }
}
