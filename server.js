const express = require('express');

const fs = require('fs');

const app = express();

const appName = 'rpg-system';

const envData = `{"apiUrl":${process.env.apiUrl}}`;

const envDataJSON = JSON.stringify(JSON.parse(envData));

fs.createWriteStream('env.json',envDataJSON,'utf8', (err)=>{
    if (err) {
        return console.error(err);
    }
});

const outputPath = `${__dirname}/dist/${appName}`;

app.use(express.static(outputPath));

app.get('/*', (req, res) =>{
    res.sendFile(`${outputPath}/index.html`);
});

app.listen(process.env.PORT || 4200);