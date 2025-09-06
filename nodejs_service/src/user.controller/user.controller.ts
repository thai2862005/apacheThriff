import client from "../Sever/thriffClient";
const getUsersPage = async (req, res) => {
  try {
    // Tạm demo tạo user luôn, sau này có thể đổi thành listUsers()
    const user = await client.createUser("Alice", "alice@example.com");

    res.render("users", { user });
  } catch (err) {
    console.error("Error:", err);
    res.render("error", { message: err.message });
  }
};

 const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await client.createUser(name, email);
    res.redirect("/users"); // sau khi tạo xong quay lại trang danh sách
  } catch (err) {
    res.render("error", { message: err.message });
  }
};

export { getUsersPage, createUser };