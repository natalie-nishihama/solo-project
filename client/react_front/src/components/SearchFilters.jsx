// 検索絞込設定表示
export default function SearchFilters({
  tags,
  searchTagIds,
  toggleFilterTag,
  keyword,
  setKeyword,
}) {
  return (
    <div>
      <h3>キーワードで絞り込み</h3>
      <input
        type="text"
        placeholder="キーワード検索"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <h3>タグで絞り込み</h3>
      <div>
        <button onClick={() => toggleFilterTag(null)}>すべて表示</button>
        {tags.map((tag) => (
          <button
            key={tag.id}
            style={{
              margin: "5px",
              backgroundColor: searchTagIds.includes(tag.id)
                ? "pink"
                : "white",
            }}
            onClick={() => toggleFilterTag(tag.id)}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}