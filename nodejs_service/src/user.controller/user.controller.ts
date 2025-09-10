import client from "../Sever/thriffClient";
import { Request, Response } from "express";
const getUsersPage = async (req: Request, res: Response) => {
  try {
    const user = await client.createUser("Alice", "alice@example.com","1234567890","123 Main St");

    res.render("users", { user });
  } catch (err) {
    console.error("Error:", err);
    res.render("error", { message: err.message });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { name, email, phone, address } = req.body;
  try {
    const user = await client.createUser(name, email, phone, address);
    res.redirect("/users"); // sau khi tạo xong quay lại trang danh sách
  } catch (err) {
    res.render("error", { message: err.message });
  }
};

  const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const user = await client.getUserById(parseInt(userId));
      res.render("userDetail", { user });
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
    const { name, email } = req.body;
    try {
      const user = await client.updateUser(parseInt(userId), name, email);
      res.redirect("/users");
    } catch (err) {
      res.render("error", { message: err.message });
    }
  }
export { getUsersPage, createUser, getUserById, deleteUser, updateUser };