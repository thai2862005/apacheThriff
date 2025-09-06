import express from 'express';
import { Express } from 'express';
import { createUser, getUsersPage } from '../user.controller/user.controller';

const router = express.Router();

const webRouter = (app: Express) => { 
    router.get("/users",getUsersPage);
    router.post("/users",createUser);
    app.use("/", router);
}
export default webRouter;