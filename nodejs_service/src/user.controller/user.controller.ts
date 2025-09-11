import client from "../Sever/thriffClient";
import { Request, Response } from "express";


const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, phone, address } = req.body;
  try {
    const user = await client.createUser(name, email, phone, address);
    res.redirect("/"); // sau khi tạo xong quay lại trang danh sách
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

  const getUserPage = async (req: Request, res: Response) => {
    const users = await client.getAllUsers();
    return res.render("user/show", { users });
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
    const { name, email } = req.body;
    try {
      const user = await client.updateUser(parseInt(userId), name, email);
      res.redirect("/users");
    } catch (err) {
      res.render("error", { message: err.message });
    }
  }
  const getALLUsers = async (req: Request, res: Response) => {
    try {
      const users = await client.getAllUsers();
      res.render("home", { users });
    } catch (err) {
      res.render("error", { message: err.message });
    }
  }

  const getCreateUserPage = async (req: Request, res: Response) => {
    res.render("user/create");
  }


  const UserPagedPanigation = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    // Lấy data và totalCount từ service hoặc DB
    const { totalCount } = await client.getUsersPaged(page, pageSize);
    const user = await client.getAllUsers()
    const totalPages = Math.ceil(totalCount / pageSize);

    res.render("dashboard/show", {
      user,
      currentPage: page,
      pageSize,
      totalPages,
    });
  } catch (err: any) {
    res.render("error", { message: err.message });
  }
};

export { createUser, getUserById, deleteUser, updateUser, getALLUsers, UserPagedPanigation , getUserPage, getCreateUserPage};