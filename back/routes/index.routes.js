import { Router } from "express";
import routerAuth from "./auth.routes.js";
import routeBook from "./book.routes.js";
const router = Router();


router.use('/books', routeBook)
router.use('/auth', routerAuth)


router.use('/*' , (req, res)=> {
    res.status(404).send({success:true,  msg : 'Pagina no existente en el servidor'});
})

export default router;