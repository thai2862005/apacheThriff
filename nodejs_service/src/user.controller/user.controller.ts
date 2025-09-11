import client from "../Sever/thriffClient";
import { Request, Response } from "express";


const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, phone, address } = req.body;
  try {
    const user = await client.createUser(name, email, phone, address);
    res.redirect("/users"); 
  } catch (err) { 
    res.render("error", { message: err.message });
  }
};

  const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const user = await client.getUserById(parseInt(userId));
      res.render("user/view", { user });
    } catch (err) {
      res.render("error", { message: err.message });
    }
  }

  

  const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const user = await client.deleteUser(parseInt(userId));
      res.redirect("/users");
    } catch (err) {
      res.render("error", { message: err.message });
    }
  }

  const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { name, email , phone, address } = req.body;
    try {
      const user = await client.updateUser(parseInt(userId), name, email, phone, address);
      res.redirect("/users");
    } catch (err) {
      res.render("error", { message: err.message });
    }
  }
const getALLUsers = async (req: Request, res: Response) => {
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
    //skip + pageSize = end (vị trí kết thúc) ,vì tổng số lượng phần tử lấy ra là pageSize nên vị trí kết thúc sẽ là skip + pageSize
    const paginatedUsers = users.slice(skip, endIndex);
//slice dùng để cắt mảng từ vị trí skip đến vị trí end (không bao gồm end)
    res.render("user/show", { 
      users: paginatedUsers,
      currentPage: page,
      pageSize,
      totalPages
    });
  } catch (err: any) {
    res.render("error", { message: err.message });
  }
};


  const getCreateUserPage = async (req: Request, res: Response) => {
    res.render("user/create");
  }


  const UserPagedPanigation = async (req: Request, res: Response) => {
  try {
    const user = await client.getAllUsers()

    res.render("dashboard/show", {
      user,
    });
  } catch (err: any) {
    res.render("error", { message: err.message });
  }
};

export { createUser, getUserById, deleteUser, updateUser, getALLUsers, UserPagedPanigation , getCreateUserPage};