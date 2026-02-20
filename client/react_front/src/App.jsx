import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 投稿一覧取得
  const ReadPosts = async () => {
    const res = await fetch("/posts");
    const data = await res.json();
    setPosts(data);
  };

  // 初回読み込み
  useEffect(() => {
   ReadPosts();
  }, []);

  // 投稿送信
  const handleSubmit = async (e) => {
    //そのイベントがもともと行われるべきデフォルトの挙動を防止する
    e.preventDefault();

    await fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        user_id: 1, // 仮で1
      }),
    });

    setTitle("");
    setContent("");
   ReadPosts();
  };

  //投稿削除
  const deletePost = async (id) => {
  await fetch(`/posts/${id}`, {
    method: "DELETE"
  });

 ReadPosts();
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>ナレッジぽーたる</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="submit">投稿</button>
      </form>
      

      <hr />

      <h2>投稿一覧</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post.id)}>削除</button>
        </div>
      ))}
    </div>
  );
}

export default App;

