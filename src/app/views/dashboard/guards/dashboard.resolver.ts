import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GameSettingsService } from 'src/app/game-settings.service';
import { IGameSettings } from 'src/models/GameSettings';
import { DashboardService } from '../shared/services/dashboard.service';

@Injectable({ providedIn: 'root' })
export class DashboardResolver implements Resolve<IGameSettings> {

    constructor(private appService:GameSettingsService,private dashboardService:DashboardService){}

    resolve(route: ActivatedRouteSnapshot): Observable<IGameSettings> | Promise<IGameSettings> | IGameSettings {
        const id = route.params.id;
        return this.appService.getGameSettings(id);
    }
}