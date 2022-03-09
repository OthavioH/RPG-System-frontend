const express = require('express');
require('dotenv').config();

const fs = require('fs');

const app = express();

const appName = 'rpg-system';

const envData = {apiUrl: process.env.apiUrl};
const envDataJSON = JSON.stringify(envData);

console.log(__dirname);

fs.writeFile(`${__dirname}/src/envionments`,envDataJSON,'utf8', (err)=>{
    if (err) {
        return console.error(err);
    }
})

const outputPath = `${__dirname}/dist/${appName}`;

app.use(express.static(outputPath));

app.get('/*', (req, res) =>{
    res.sendFile(`${outputPath}/index.html`);
});

app.listen(process.env.PORT || 4200);