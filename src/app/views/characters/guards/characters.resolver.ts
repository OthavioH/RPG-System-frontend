import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GameSettingsService } from 'src/app/game-settings.service';
import { GameSettings } from 'src/model/GameSettings';

@Injectable({ providedIn: 'root' })
export class CharactersResolver implements Resolve<GameSettings> {

    constructor(private appService:GameSettingsService){}

    resolve(route: ActivatedRouteSnapshot): Observable<GameSettings> | Promise<GameSettings> | GameSettings {
        console.log("sokdoaskd");
        return this.appService.getGameSettings();
    }
}