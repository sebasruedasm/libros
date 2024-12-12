import { Router } from "express";
import { login } from "../controllers/auth.controller.js"; 

const routerAuth = Router();
routerAuth.post('/login', login);


export default routerAuth;
