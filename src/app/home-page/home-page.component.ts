import { Component, OnChanges, OnInit } from '@angular/core';
import {
  GuardsCheckEnd,
  NavigationEnd,
  ResolveEnd,
  ResolveStart,
  Router,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export const loadingObserver$ = new BehaviorSubject<boolean>(null);

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnChanges {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      loadingObserver$.next(true);

      if (event instanceof NavigationEnd && event.url === '/') {
        this.router.navigate(['/dashboard']);
      }

      if (event instanceof ResolveStart) {
        loadingObserver$.next(true);
      } else if (event instanceof ResolveEnd) {
        loadingObserver$.next(false);
      }
    });
  }

  ngOnInit(): void {
    console.log('init');
  }

  ngOnChanges(): void {
    console.log('changed');
  }
}
