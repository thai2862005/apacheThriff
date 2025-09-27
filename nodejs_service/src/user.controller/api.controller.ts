import client from "../Sever/thriffClient";
import { Request, Response } from "express";

const createUserApi = async (req: Request, res: Response) => {
  const { name, email, phone, address } = req.body;
  try {
    const user = await client.createUser(name, email, phone, address);
    res.status(201).json({ message: "User created", user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const getUserByIdApi = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await client.getUserById(parseInt(userId));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserApi = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
   const user =  await client.deleteUser(parseInt(userId));
    res.json({ message: "User deleted",data: user});
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserApi = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { name, email, phone, address } = req.body;
  try {
    const user = await client.updateUser(parseInt(userId), name, email, phone, address);
    res.json({ message: "User updated", user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsersApi = async (req: Request, res: Response) => {
  let page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 3;
  try {
    const users = await client.getAllUsers();
    const totalCount = users.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    if (page > totalPages) page = totalPages;
    if (page < 1) page = 1;
    const skip = (page - 1) * pageSize;
    const endIndex = skip + pageSize;
    const paginatedUsers = users.slice(skip, endIndex);
    res.json({
      users: paginatedUsers,
      currentPage: page,
      pageSize,
      totalPages,
      totalCount,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export {
  createUserApi,
  getUserByIdApi,
  deleteUserApi,
  updateUserApi,
  getAllUsersApi,
};