import { useState } from "react";

// Dữ liệu ban đầu chứa danh sách bạn bè với thông tin: id, tên, ảnh và số dư
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  // Quản lý state cho danh sách bạn bè
  const [friends, setFriends] = useState(initialFriends);
  // Quản lý hiển thị form thêm bạn
  const [showAddFriend, setShowAddFriend] = useState(false);
  // Quản lý bạn được chọn để chia bill
  const [selectFriend, setSelectFriend] = useState(null);

  // Xử lý hiển thị/ẩn form thêm bạn
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  // Xử lý thêm bạn mới vào danh sách
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  // Xử lý chọn bạn để chia bill
  function handleSelection(friend) {
    setSelectFriend((cur) => (friend.id === cur?.id ? null : friend));
    setShowAddFriend(false);
  }

  // Xử lý cập nhật số dư sau khi chia bill
  function handleSpitBill(amount) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectFriend.id
          ? (friend = { ...friend, balance: friend.balance + amount })
          : friend
      )
    );

    setSelectFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelect={handleSelection}
          selectFriend={selectFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}{" "}
        </Button>
      </div>
      {selectFriend && (
        <FormSplitBill
          key={selectFriend.id}
          selectFriend={selectFriend}
          onSplitBill={handleSpitBill}
        />
      )}
    </div>
  );
}

// Component button có thể tái sử dụng
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

// Component hiển thị danh sách bạn bè
function FriendsList({ friends, onSelect, selectFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelect={onSelect}
          selectFriend={selectFriend}
        />
      ))}
    </ul>
  );
}

// Component hiển thị thông tin của một người bạn
function Friend({ friend, onSelect, selectFriend }) {
  // Kiểm tra xem bạn này có đang được chọn không
  const isSelected = selectFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {/* Hiển thị thông tin nợ khi số dư âm */}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}

      {/* Hiển thị thông tin cho vay khi số dư dương */}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}

      {/* Hiển thị khi không có nợ nần */}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelect(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

// Component form thêm bạn mới
function FormAddFriend({ onAddFriend }) {
  // Quản lý state cho tên và URL ảnh
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=48");

  // Xử lý submit form thêm bạn
  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image,
      balance: 0,
    };
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48?u=48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

// Component form chia bill
function FormSplitBill({ selectFriend, onSplitBill }) {
  // Quản lý các state cho form chia bill
  const [billValue, setBillValue] = useState(""); // Tổng bill
  const [paidByUser, setPaidByUser] = useState(""); // Số tiền người dùng trả
  const paidByFriend = billValue ? billValue - paidByUser : ""; // Số tiền bạn trả
  const [whoIsPaying, setWhoIsPaying] = useState("user"); // Người thanh toán

  // Xử lý submit form chia bill
  function handleSubmit(e) {
    e.preventDefault();
    if (!billValue || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > billValue
              ? paidByUser
              : Number(e.target.value)
          )
        }
      />

      <label>👫 {selectFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
