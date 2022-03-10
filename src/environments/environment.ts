// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import envVars from './env.json';

export const environment = {
  production: false,
  apiUrl: envVars.apiUrl,
  adsense: {
    adClient: envVars.adsense.adClient,
    show: envVars.adsense.show,
    verticalAdSlot: envVars.adsense.verticalAdSlot,
    horizontalAdSlot: envVars.adsense.horizontalAdSlot,
    adFormat: envVars.adsense.adFormat,
    fullWidthResponsive: envVars.adsense.fullWidthResponsive,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
