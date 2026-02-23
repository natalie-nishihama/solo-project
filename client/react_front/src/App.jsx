import { useEffect, useState } from "react";

function App() {
  //投稿一覧取得用
  const [posts, setPosts] = useState([]);
  //新規投稿用
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //投稿編集用
  const [editingId, setEditingId] = useState(null);

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

  if (editingId) {
    // 投稿更新
    await fetch(`/posts/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
  } else {
    // 投稿新規作成
    await fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, user_id: 1 }),
    });
  }

  setTitle("");
  setContent("");
  setEditingId(null);
  ReadPosts();
};




  // const handleSubmit = async (e) => {
    
  //   e.preventDefault();

  //   await fetch("/posts", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title,
  //       content,
  //       user_id: 1, // 仮で1
  //     }),
  //   });

  //   setTitle("");
  //   setContent("");
  //  ReadPosts();
  // };

  //投稿編集
  const startEdit = (post) => {
  setTitle(post.title);
  setContent(post.content);
  setEditingId(post.id);
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
          <h3>id:{post.id} title:{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => startEdit(post)}>編集</button>
          <button onClick={() => deletePost(post.id)}>削除</button>
        </div>
      ))}
    </div>
  );
}

export default App;

