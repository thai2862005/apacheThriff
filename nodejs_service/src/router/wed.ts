import express from 'express';
import { Express } from 'express';
import { createUser, deleteUser, getALLUsers, getCreateUserPage, getUserById, getUserPage, updateUser, UserPagedPanigation } from '../user.controller/user.controller';

const router = express.Router();

const webRouter = (app: Express) => { 
    router.get("/",UserPagedPanigation);
    router.get("/users",getUserPage);
    router.post("/users/delete/:id", deleteUser);
    router.post("/users/update/:id", updateUser);
    router.get("/users/create", getCreateUserPage);
    router.post("/users/handle-create", createUser);
    router.get("/users/view/:id", getUserById);
    app.use("/", router);
}
export default webRouter;