import express from 'express';
import { Express } from 'express';
import {
  createUserApi,
  deleteUserApi,
  getAllUsersApi,
  getUserByIdApi,
  updateUserApi,
} from '../user.controller/api.controller';

const router = express.Router();
router.post('/users', createUserApi);
router.get('/users', getAllUsersApi);
router.get('/users/:id', getUserByIdApi);
router.put('/users/:id', updateUserApi);
router.delete('/users/:id', deleteUserApi);

const webRouterApi = (app: Express) => {
  app.use("/api", router);
};

export default webRouterApi;