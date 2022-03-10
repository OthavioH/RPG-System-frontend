const express = require('express');

const app = express();

const appName = 'rpg-system';

const outputPath = `${__dirname}/docs/${appName}`;

app.use(express.static(outputPath));

app.get('/*', (req, res) =>{
    res.sendFile(`${outputPath}/index.html`);
});

app.listen(process.env.PORT || 4200);