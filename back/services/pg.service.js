import pgPromise from "pg-promise";
import { env } from "../config/default.js";
export default class pgService{
    static instance;
    constructor(){
        if(pgService.instance){
            return pgService.instance;
        }

        pgService.instance=this;

        const pgp=pgPromise({});
        this.connection=pgp(env.postgres)
        this.connection.connect()
        .then(obj=>{
            console.log("base de datos conectada en la version "+ obj.client.serverVersion);
            obj.done()
        })

        .catch(error => {
            console.log("error", error.message || error);
        })
    }
}