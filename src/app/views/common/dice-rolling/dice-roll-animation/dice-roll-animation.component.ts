import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dice-roll-animation',
  templateUrl: './dice-roll-animation.component.html',
  styleUrls: ['./dice-roll-animation.component.scss'],
  animations: [
    trigger('diceResultFadeIn', [
      state('invisible', style({opacity: 0})),
      state('visible', style({opacity: 1})),
      transition('invisible => visible', animate('800ms')),
      transition('visible => invisible', animate('300ms')),
    ])
  ]
})
export class DiceRollAnimationComponent implements OnInit {

  @Input() imageUrl:string;
  @Input() shouldShow:boolean = false;
  @Input() diceResult:number;

  animationState = 'invisible';

  timestamp:number;

  constructor() {
    
  }

  ngOnInit(): void {
    
  }

  changeDiceAnimationState(): void {
    const interval = setTimeout(() => {
      this.animationState = this.animationState === 'invisible' ? 'visible' : 'invisible';
      clearInterval(interval);
    }, 650);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.shouldShow) {
      this.animationState = 'invisible';
    }
    else {
      this.animationState = 'visible';
    }
    this.changeDiceAnimationState();
    this.timestamp = Date.now();
  }

}
