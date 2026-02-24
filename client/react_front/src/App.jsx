import { useEffect, useState } from "react";
import PostForm from "./components/PostForm";
import SearchFilters from "./components/SearchFilters";
import PostList from "./components/PostList";
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
  if (id) {
    // すべて表示
    setSearchTagIds([]);
  } else if (searchTagIds.includes(id)) {
    // 既に選択されているタグを解除
    setSearchTagIds(searchTagIds.filter(tagId => tagId !== id));
  } else {
    // 選択したタグを追加
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

      <button type="button" onClick={() => setIsUserModalOpen(true)}>
        ユーザー追加
      </button>

      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        users={users}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        tags={tags}
        selectedTags={selectedTags}
        selectTag={selectTag}
        handleCreate={handleCreate}
      />

      <SearchFilters
        tags={tags}
        searchTagIds={searchTagIds}
        toggleFilterTag={toggleFilterTag}
        keyword={keyword}
        setKeyword={setKeyword}
      />

      <PostList
        posts={posts}
        searchTagIds={searchTagIds}
        keyword={keyword}
        handleLike={handleLike}
        startEdit={startEdit}
        deletePost={deletePost}
      />

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

