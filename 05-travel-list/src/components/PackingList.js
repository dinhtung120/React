import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  // Quản lý tiêu chí sắp xếp danh sách
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  // Sắp xếp theo thứ tự nhập vào
  if (sortBy === "input") sortedItems = items;
  // Sắp xếp theo thứ tự bảng chữ cái của mô tả
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  // Sắp xếp theo trạng thái đã đóng gói
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by descripton</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear Lists</button>
      </div>
    </div>
  );
}
