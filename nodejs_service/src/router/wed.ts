import express from 'express';
import { Express } from 'express';
import { createUser, deleteUser, getALLUsers, updateUser } from '../user.controller/user.controller';

const router = express.Router();

const webRouter = (app: Express) => { 
    router.get("/users",getALLUsers);
    router.post("/users",createUser);
    router.post("/users/:id", deleteUser);
    router.post("/users/:id", updateUser);
    app.use("/", router);
}
export default webRouter;