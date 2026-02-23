// 投稿一覧表示
import PostItem from "./PostItem";

export default function PostList({
  posts,
  searchTagIds,
  keyword,
  handleLike,
  startEdit,
  deletePost,
}) {
  return (
    <div>
      {posts
        .filter((post) => {
          // タグ検索
          // .some ➡ 条件を満たすものが１つでもあればtrue
          const tagMatch =
            searchTagIds.length === 0 ||
            (post.tags ?? []).some((tag) =>
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
        .map((post) => (
          <PostItem
            key={post.id}
            post={post}
            handleLike={handleLike}
            startEdit={startEdit}
            deletePost={deletePost}
          />
        ))}
    </div>
  );
}