import jwt from "jsonwebtoken";
import { env } from "../config/default.js";

export const generateToken = (data) => {
    let token = jwt.sign(
        {
            data: data,
            exp: Math.floor(Date.now() / 1000) + parseInt(env.tokenExpiration),
        },
        env.secretKey
    );

    return token;
};
