import express, { Application } from 'express';
import dotenv from "dotenv"
// import './config/database'
import mongoose from 'mongoose'
import router from './routes/routes';
import bodyParser from 'body-parser';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router);

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/testdb').then(() => console.log('connected')).catch((err: any) => console.log('something is wrong', err.message))
async function main() {

    await app.listen(process.env.PORT, async () => {
        console.log("server is running ");

    })
}

main();
