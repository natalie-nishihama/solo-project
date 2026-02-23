// 新規投稿フォーム
export default function PostForm({
  title, setTitle,
  content, setContent,
  users, selectedUserId, setSelectedUserId,
  tags, selectedTags, selectTag,
  handleCreate,
}) {
  return (
    <form onSubmit={handleCreate}>
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

      <button type="submit">投稿</button>
    </form>
  );
}