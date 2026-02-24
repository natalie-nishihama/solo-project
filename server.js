//Expressサーバの作成
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");
const tagsRoutes = require("./routes/tags");

const path = require("path");
const app = express();

// ミドルウェア
app.use(cors());
app.use(express.json());

// API ルート
app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);
app.use("/tags", tagsRoutes);

// React のビルドフォルダを静的配信
const buildPath = path.join(__dirname, "client", "react_front", "dist");
console.log("Build path:", buildPath);
app.use(express.static(buildPath));

// 静的ファイルに存在しない場合は React の index.html に投げる
app.use((req, res, next) => {
  res.sendFile(path.join(buildPath, "index.html"), (err) => {
    if (err) {
      next(err);
    }
  });
});

// サーバ起動
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
