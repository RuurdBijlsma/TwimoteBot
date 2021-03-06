import Log from "../Log.js";
import {initEmoteSticker} from "./models/EmoteStickerModel.js";
import {initEmote} from "./models/EmoteModel.js";

const console = new Log("Database");

class Database {
    constructor() {
        this.db = null;
    }

    async setDb(db) {
        this.db = db;
        await this.init();
    }

    async init() {
        try {
            await this.db.authenticate();
            console.log("Postgres connection started successfully");

            console.log("Init emote sticker");
            initEmoteSticker(this.db);
            console.log("Init emote");
            initEmote(this.db);

            console.log("Syncing db");
            await this.db.sync();
        } catch (e) {
            console.warn("Postgres connection failed", e);
        }
    }
}

export default new Database();
