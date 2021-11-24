import express, { Application } from 'express';
import dotenv from "dotenv"
import routes from './routes/auth'
import './config/database'

const app: Application = express();

app.use(express.json());
app.use(routes);

dotenv.config();

async function main() {

    await app.listen(process.env.PORT, async () => {
        console.log("server is running ");

    })
}

main();
