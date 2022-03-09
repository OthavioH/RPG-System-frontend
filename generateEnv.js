require('dotenv').config();

const fs = require('fs');

const envData = {apiUrl: process.env.apiUrl};
const envDataJSON = JSON.stringify(envData);

console.log(`${__dirname}/src/environments`);

fs.writeFile(`${__dirname}/src/environments/env.json`,envDataJSON,'utf8', (err)=>{
    if (err) {
        return console.error(err);
    }
})