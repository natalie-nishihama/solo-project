import { useEffect, useState } from "react";
//モーダル用
import EditModal from "./components/EditModal";
import UserAddModal from "./components/UserAddModal";

function App() {
  //投稿一覧取得用
  const [posts, setPosts] = useState([]);
  //新規投稿用
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  //タグ選択用
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  //投稿編集用
  const [editingId, setEditingId] = useState(null);
  //モーダル用
  const [isModalOpen, setIsModalOpen] = useState(false);
  //ユーザ追加用
  const [newUserName, setNewUserName] = useState("");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  //タグ検索用
  const [searchTagIds, setSearchTagIds] = useState([]);
  //キーワード検索用
  const [keyword, setKeyword] = useState("");

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
   readTags();
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
      body: JSON.stringify({ title, content, user_id: Number(selectedUserId), tag_id: selectedTags }),
    });

  setTitle("");
  setContent("");
  setEditingId(null);
  ReadPosts();
  setSelectedTags([]);
};

// タグ読み込み
const readTags = async () => {
  const res = await fetch("/tags");
  const data = await res.json();
  console.log("tagdataaaaaaaaaaaa:",data)
  setTags(data);
};

const selectTag = (id) => {
  //選択済みタグ配列に押下したタグが存在するか
  if (selectedTags.includes(id)) {
    // 存在する場合➡フィルターで削除する
    setSelectedTags(selectedTags.filter((tagId) => tagId !== id));
  } else {
    // 選択しない場合➡追加する
    setSelectedTags([...selectedTags, id]);
  }
};

//ユーザ読み込み
const readUsers = async () => {
  const res = await fetch("/users");
  const data = await res.json();
  setUsers(data);
};

//ユーザ追加用
const handleAddUser = async (e) => {
  e.preventDefault();
  if (!newUserName) return;

  const res = await fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newUserName }),
  });

  const addedUser = await res.json();

  setNewUserName("");
  setIsUserModalOpen(false);

  await readUsers();

  // 追加したユーザーを自動選択
  // setSelectedUserId(addedUser.id);
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


  //タグ検索　タグ選択
  const toggleFilterTag = (id) => {
    if (searchTagIds.includes(id)) {
      setSearchTagIds(searchTagIds.filter(tagId => tagId !== id));
    } else {
      setSearchTagIds([...searchTagIds, id]);
    }
  };

  //いいね機能
  const handleLike = async (id) => {
    await fetch(`/posts/${id}/like`, {
      method: "POST",
    });
    ReadPosts(); 
  };


  return (
    <div style={{ padding: "20px" }}>
      <h1>ナレッジぽーたる</h1>

      <button type="button" onClick={() => setIsUserModalOpen(true)}>ユーザー追加</button>

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

        {/* タグ選択ボタン */}
        <div>
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              style={{
                margin: "5px",
                backgroundColor: selectedTags.includes(tag.id)
                  ? "lightblue"
                  : "white",
              }}
              onClick={() => selectTag(tag.id)}
            >
              {tag.name}
            </button>
          ))}
        </div>

        <br />
        {/* ユーザ選択のセレクトボックス */}
        <select
          value={selectedUserId}//選択したユーザ
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">ユーザー選択</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button type="submit">投稿</button>
      </form>
      

      <hr />

      <h2>投稿一覧</h2>

      <h3>キーワードで絞り込み</h3>
      
        {/* キーワード検索入力欄 */}
        <input
          type="text"
          placeholder="キーワード検索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

      <h3>タグで絞り込み</h3>
      <div>
        <button onClick={() => setSearchTagIds([])}>
          すべて表示
        </button>

        {tags.map(tag => (
          <button
            key={tag.id}
            style={{
              margin: "5px",
              backgroundColor:
                searchTagIds.includes(tag.id)
                  ? "pink"
                  : "white"
            }}
            onClick={() => toggleFilterTag(tag.id)}
          >
            {tag.name}
          </button>
        ))}
      </div>
      {/* 投稿一覧 */}
      {posts
        .filter(post => {

            // タグ検索
            // .some ➡ 条件を満たすものが１つでもあればtrue
          const tagMatch =
            searchTagIds.length === 0 ||
            (post.tags ?? []).some(tag =>
              searchTagIds.includes(tag.id)
            );

          // キーワード検索（タイトルか本文に含まれているか）
          const keywordMatch =
            keyword === "" ||
            post.title.toLowerCase().includes(keyword.toLowerCase()) ||
            post.content.toLowerCase().includes(keyword.toLowerCase());
          
          // toLowerCase() ➡ 大文字小文字区別を無視する

          //タグに引っかかる&キーワード一致したらtrueで返す
          return tagMatch && keywordMatch;
        })
        .map(post => (
        <div key={post.id}>
              <p>投稿者: {post.user_name}</p>
              <h3>id:{post.id} title:{post.title}</h3>
              <p>{post.content}</p>
              <div>
                {(post.tags ?? []).map((tag, index) => (
                  <span key={index} style={{ marginRight: "5px", color: "blue" }}>
                    #{tag.name}
                  </span>
                ))}
              </div>
          <p>❤ : {post.like_count}</p>
          <button onClick={() => handleLike(post.id)}>❤</button>

          <button onClick={() => startEdit(post)}>編集</button>
          <button onClick={() => deletePost(post.id)}>削除</button>
        </div>
      ))}

      <UserAddModal
        open={isUserModalOpen}
        handleClose={() => setIsUserModalOpen(false)}
        handleAddUser={handleAddUser}
        newUserName={newUserName}
        setNewUserName={setNewUserName}
      />

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

