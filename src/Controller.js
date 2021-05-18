import express from 'express';
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import Log from "./Log.js";

import seq from "sequelize";
import cred from "../res/auth/credentials.json"
import Database from "./database/Database.js";
import TwimoteModule from "./modules/twimote-bot/TwimoteModule.js";

const {Sequelize} = seq;
const {dbUser, dbPass, dbName} = cred;
const console = new Log("Controller");

class Controller {
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());

        this.modules = [
            new TwimoteModule(),
        ];
    }

    setRoutes() {
        for (let module of this.modules) {
            module.setRoutes(this.app, this.db);
            console.log('Initialized ' + module.constructor.name);
        }
    }

    async start(port = 3000) {
        let server = http.createServer(this.app);
            console.warn("Could not get HTTPS credentials, switching to HTTP");
        console.log("Initializing DB connection with ", {dbName, dbUser});
        this.db = new Sequelize(dbName, dbUser, dbPass, {
            host: 'localhost',
            dialect: 'postgres',
            logging: false,
        });
        await Database.setDb(this.db);

        this.setRoutes();
        server.listen(port, () =>
            console.log(`Server listening on port ${port}!`)
        );
    }
}

export default new Controller();
