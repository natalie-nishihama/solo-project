//Expressサーバの作成
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");
const tagsRoutes = require("./routes/tags");

const express = require("express");
const path = require("path");

const app = express();

// 静的ファイル配信
const buildPath = path.join(__dirname, "client/react_front/dist");
app.use(express.static(buildPath));

app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);
app.use("/tags", tagsRoutes);

// 静的ファイルに存在しない場合は index.html を返す
app.use((req, res, next) => {
  res.sendFile(path.join(buildPath, "index.html"), (err) => {
    if (err) {
      next(err);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const path = require("path");
// const app = express();

// app.use(cors());
// app.use(express.json());

// //投稿
// app.use("/posts", postsRoutes);

// //タグ
// app.use("/tags", tagsRoutes);

// // ユーザー
// app.use("/users", usersRoutes);

// // app.get("/", (req, res) => {
// //   res.send("Server is running");
// // });

// // React のビルドフォルダを静的配信
// app.use("/", express.static(__dirname + "/client/react_front/dist"));
// app.use(express.static(path.join(__dirname, "/client/react_front/dist")));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
