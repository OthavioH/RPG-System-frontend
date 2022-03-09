import envVars from './env.json';

export const environment = {
  production: true,
  apiUrl: envVars.apiUrl,
  adsense: {
    adClient: envVars.adsense.adClient,
    show: envVars.adsense.show,
    adSlot: envVars.adsense.adSlot,
    adFormat: envVars.adsense.adFormat,
    fullWidthRes: envVars.adsense.fullWidthResponsive,
  }
};
