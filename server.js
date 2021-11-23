const app = require('./app');

const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT, (err)=>
{
    if(!err)
    {
        console.log('working fine',process.env.PORT);
    }
    else
    {
        console.log('something is wrong');
    }
});