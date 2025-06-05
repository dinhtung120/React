export default function Stats({ items }) {
  // Hiển thị thông báo nếu danh sách trống
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding items to your list!</em>
      </p>
    );
  }

  // Tính toán các thống kê
  const numberItem = items.length; // Tổng số vật phẩm
  const numPacked = items.filter((item) => item.packed).length; // Số vật phẩm đã đóng gói
  const percentagePacked = Math.round((numPacked / numberItem) * 100); // Phần trăm đã đóng gói

  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100
          ? "You got everything! Ready to go!"
          : ` You have ${numberItem} items on your list, and you already packed${" "}
        ${numPacked} (${percentagePacked}%)`}
      </em>
    </footer>
  );
}
