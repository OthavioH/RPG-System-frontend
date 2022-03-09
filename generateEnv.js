require('dotenv').config();

const envData = {apiUrl: process.env.apiUrl};
const envDataJSON = JSON.stringify(envData);

fs.writeFile(`${__dirname}/src/envionments`,envDataJSON,'utf8', (err)=>{
    if (err) {
        return console.error(err);
    }
})