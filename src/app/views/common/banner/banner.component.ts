import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banner } from 'src/models/Banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() isVertical: boolean;
  banner: Banner;
  showAd = environment.adsense.show;

  constructor() {
    this.banner = {
      adClient:environment.adsense.adClient,
      adFormat:environment.adsense.adFormat,
      adSlot: this.isVertical ? environment.adsense.verticalAdSlot : environment.adsense.horizontalAdSlot,
      fullWidthResponsive:environment.adsense.fullWidthResponsive,
    };
  }

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
