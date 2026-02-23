//Expressサーバの作成
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");
const tagsRoutes = require("./routes/tags");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//投稿
app.use("/posts", postsRoutes);

//タグ
app.use("/tags", tagsRoutes);

// ユーザー
app.use("/users", usersRoutes);
