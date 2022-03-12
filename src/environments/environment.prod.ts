import envVars from './env.json';

export const environment = {
  production: true,
  apiUrl: envVars.apiUrl,
  adsense: {
    adClient: envVars.adsense.adClient,
    show: envVars.adsense.show,
    verticalAdSlot: envVars.adsense.verticalAdSlot,
    horizontalAdSlot: envVars.adsense.horizontalAdSlot,
    adFormat: envVars.adsense.adFormat,
    fullWidthResponsive: envVars.adsense.fullWidthRes,
  }
};
