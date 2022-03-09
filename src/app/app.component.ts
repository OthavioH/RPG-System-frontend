import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rpg-system';
  banner:Banner;

  constructor(){
    this.banner = {
      adClient:environment.adsense.adClient,
      adFormat:environment.adsense.adFormat,
      adSlot:environment.adsense.adSlot,
      fullWidthResponsive:environment.adsense.fullWidthResponsive,
    };
  }
}
