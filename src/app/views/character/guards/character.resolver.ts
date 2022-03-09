import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameSettingsService } from 'src/app/game-settings.service';
import { ICharacter } from 'src/models/Character';
import { dashboardService } from '../../characters/shared/services/characters.service';

@Injectable({ providedIn: 'root' })
export class CharacterResolver implements Resolve<ICharacter> {

    constructor(private dashboardService: dashboardService,private gameSettingsService: GameSettingsService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ICharacter> | Promise<ICharacter> | ICharacter {
        const id = route.params["characterId"];
        const gameId = route.params["id"];
        return this.dashboardService.getCharacterById(id,gameId);
    }
}