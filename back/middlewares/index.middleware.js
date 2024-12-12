import { Router } from "express";
import { verifyToken } from "./token.middleware.js";

const middle = Router();

middle.use("/books", verifyToken);

export default middle;