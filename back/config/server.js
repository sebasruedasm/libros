import express from "express";
import cors from "cors"; // Import cors
import { env } from "./default.js";
import router from "../routes/index.routes.js";
import pgServices from "../services/pg.service.js";
import middle from "../middlewares/index.middleware.js";

export default class Server {
    constructor() {
        this.app = express();
        this.port = env.port;
        this.app.use(cors()); // Enable CORS with default options
        this.app.use(middle);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    connectionDB(){
        new pgServices();
    }


    middlewards(){
        // this.app.use(bodyParser.json());
        // this.app.use(bodyParser.urlencoded({extended: true}));

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    route(){
       this.app.use(router)
    }

    runServer(){
        this.app.listen(this.port, ()=>{
            console.log("Server running on port", this.port);
        })
    }

    load(){
        this.connectionDB();
        this.middlewards();
        this.route();
        this.runServer();
    }
}