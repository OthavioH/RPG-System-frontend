import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banner } from 'src/models/Banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() banner: Banner;
  showAd = environment.adsense.show;

  constructor() { }

  ngOnInit(): void {
  }

  ngafterViewInit(): void {
    setTimeout(() => {
      try {
          (window['adsbygoogle'] = window['adsbygoogle'] || []).push({
              overlays: {bottom: true}
          });
      } catch (e) {
          console.error(e);
      }
  }, 0);
  }

}
