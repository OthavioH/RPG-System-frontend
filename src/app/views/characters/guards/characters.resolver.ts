import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, delay } from 'rxjs';
import { GameSettingsService } from 'src/app/game-settings.service';
import { IGameSettings } from 'src/models/GameSettings';

@Injectable({ providedIn: 'root' })
export class CharactersResolver implements Resolve<IGameSettings> {
  constructor(private appService: GameSettingsService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IGameSettings> | Promise<IGameSettings> | IGameSettings {
    return this.appService.getGameSettings();
  }
}
