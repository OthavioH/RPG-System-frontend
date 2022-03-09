import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameSettingsService } from 'src/app/game-settings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private gameSettingsService: GameSettingsService,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  async createNewGame() {
    await this.gameSettingsService.createNewGame();
  }

}
