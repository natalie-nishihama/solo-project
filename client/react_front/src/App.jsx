import { useEffect, useState } from "react";
//モーダル用
import EditModal from "./components/EditModal";

function App() {
  //投稿一覧取得用
  const [posts, setPosts] = useState([]);
  //新規投稿用
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  //投稿編集用
  const [editingId, setEditingId] = useState(null);
  //モーダル用
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 投稿一覧取得
  const ReadPosts = async () => {
    const res = await fetch("/posts");
    const data = await res.json();
    console.log(data);
    setPosts(data);
  };

  // 初回読み込み
  useEffect(() => {
   ReadPosts();
   readUsers();
  }, []);


// 新規投稿送信
const handleCreate = async (e) => {
  //そのイベントがもともと行われるべきデフォルトの挙動を防止する
  e.preventDefault();

    // 投稿新規作成
    await fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, user_id: 1 }),
    });

  setTitle("");
  setContent("");
  setEditingId(null);
  ReadPosts();
};

//ユーザ選択用
const readUsers = async () => {
  const res = await fetch("/users");
  const data = await res.json();
  setUsers(data);
};

  //投稿編集
const startEdit = (post) => {
  setTitle(post.title);
  setContent(post.content);
  setEditingId(post.id);
  //編集モーダル開く
  setIsModalOpen(true);
};

//投稿更新（更新ボタン押下）
const handleUpdate = async (e) => {
  //そのイベントがもともと行われるべきデフォルトの挙動を防止する
  e.preventDefault();
  await fetch(`/posts/${editingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  setEditingId(null);
  setTitle("");
  setContent("");
  //編集モーダル閉じる
  setIsModalOpen(false);
  ReadPosts();
};

//更新キャンセル機能（キャンセルボタン押下）
const handleCancel = () => {
  setEditingId(null);
  setTitle("");
  setContent("");
  //編集モーダル閉じる
  setIsModalOpen(false);
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

      <form onSubmit={handleCreate}>
        <input
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br/>
        <textarea
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />

          <button type="submit">投稿</button>

        <button type="button" onClick={handleCancel}>
          キャンセル
        </button>
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

      <EditModal
        open={isModalOpen}
        handleClose={handleCancel}
        handleUpdate={handleUpdate}
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
      />

    </div>

    
  );
}

export default App;

