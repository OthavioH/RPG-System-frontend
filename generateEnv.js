require('dotenv').config();

const fs = require('fs');

const envData = {
    apiUrl: process.env.apiUrl,
    adsense: {
        adClient: process.env.adClient, 
        show:process.env.adShow,
        horizontalAdSlot:process.env.horizontalAdSlot,
        verticalAdSlot:process.env.verticalAdSlot,
        adFormat:process.env.adFormat,
        fullWidthRes: process.env.fullWidthResponsive,
    }
};
const envDataJSON = JSON.stringify(envData);

console.log(`${__dirname}/src/environments`);

fs.writeFile(`${__dirname}/src/environments/env.json`,envDataJSON,'utf8', (err)=>{
    if (err) {
        return console.error(err);
    }
})