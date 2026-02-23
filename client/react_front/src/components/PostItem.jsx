// 投稿表示（単体）
export default function PostItem({
  post,
  handleLike,
  startEdit,
  deletePost,
}) {
  return (
    <div>
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
  );
}