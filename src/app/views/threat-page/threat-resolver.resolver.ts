import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Threat } from 'src/models/Threat';
import { ThreatService } from '../common/create-threat-dialog/threat.service';

@Injectable({
  providedIn: 'root',
})
export class ThreatResolver implements Resolve<Threat> {
  constructor(private threatService: ThreatService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Threat> | Promise<Threat> | Threat {
    const id = route.params['id'];
    return this.threatService.getThreatById(id);
  }
}
