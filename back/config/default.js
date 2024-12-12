import dotenv from "dotenv";
dotenv.config();
export const env = {
    port: process.env.PORT || 8000,
    postgres: process.env.DB_URL_PG,
    secretKey: process.env.SECRET_KEY,
    tokenExpiration: process.env.TOKEN_EXPIRATION || 3600
};
