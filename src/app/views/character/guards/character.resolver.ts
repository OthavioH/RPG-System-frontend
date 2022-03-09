import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, } from '@angular/router';
import { Observable } from 'rxjs';
import { GameSettingsService } from 'src/app/game-settings.service';
import { ICharacter } from 'src/models/Character';
import { DashboardService } from '../../dashboard/shared/services/dashboard.service';

@Injectable({ providedIn: 'root' })
export class CharacterResolver implements Resolve<ICharacter> {

    constructor(
        private dashboardService: DashboardService,
        private gameSettingsService: GameSettingsService,
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ICharacter> | Promise<ICharacter> | ICharacter {
        const id = route.paramMap.get("characterId");
        const gameId = route.paramMap.get("id");
        this.dashboardService.setGameId(gameId);
        return this.dashboardService.getCharacterById(+id,gameId);
    }
}