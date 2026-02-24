import "./PostForm.css"

// 新規投稿フォーム
export default function PostForm({
  title, setTitle,
  content, setContent,
  users, selectedUserId, setSelectedUserId,
  tags, selectedTags, selectTag,
  handleCreate,
}) {
  return (
    <form onSubmit={handleCreate} className="post-form">
      <p className="label">新規投稿</p>
      <input
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="post-input"
      />
      <br />
      <textarea
        placeholder="内容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="post-textarea"
      />
      <br />

      {/* タグ選択ボタン */}
      <div>
        {tags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            style={{
              border: "1px solid #000000",
              margin: "5px",
              backgroundColor: selectedTags.includes(tag.id)
                ? "pink"
                : "white",
            }}
            onClick={() => selectTag(tag.id)}
            className="post-tags"
          >
            {tag.name}
          </button>
        ))}
      </div>

      <br />
      {/* ユーザ選択 */}
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">ユーザー選択</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <button type="submit" className="submit-btn">投稿</button>
    </form>
  );
}