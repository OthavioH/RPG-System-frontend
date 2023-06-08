import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { loadingObserver$ } from 'src/app/home-page/home-page.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (loadingObserver$.value == null) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
