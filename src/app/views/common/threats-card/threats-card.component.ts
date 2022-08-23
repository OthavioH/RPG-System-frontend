import { Component, Input, OnInit } from '@angular/core';
import { Threat } from '../../../../models/Threat';

@Component({
  selector: 'app-threats-card',
  templateUrl: './threats-card.component.html',
  styleUrls: ['./threats-card.component.scss'],
})
export class ThreatsCardComponent implements OnInit {
  @Input() threat: Threat;

  defaultImgUrl = '/../../assets/unknown_character_transparent.png';

  constructor() {}

  ngOnInit(): void {}

  onImageError(event: any): void {
    event.target.src = this.defaultImgUrl;
  }
}
