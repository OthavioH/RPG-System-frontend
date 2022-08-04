import { Component, Input, OnInit } from '@angular/core';
import { ICharacter } from '../../../../models/Character';

@Component({
  selector: 'app-portrait-card',
  templateUrl: './portrait-card.component.html',
  styleUrls: ['./portrait-card.component.scss']
})
export class PortraitCardComponent implements OnInit {

  @Input('character') character:ICharacter;

  defaultImgUrl = '/../../assets/unknown_character_transparent.png';

  constructor() { }

  ngOnInit(): void {
  }

  onImageError(event:any):void {
    event.target.src = this.defaultImgUrl;
  }
}
