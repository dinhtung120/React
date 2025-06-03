// Import các thư viện cần thiết
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Dữ liệu pizza - mảng chứa thông tin các loại pizza
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// Component chính của ứng dụng
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

// Render ứng dụng vào DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// Component Header - hiển thị tiêu đề của trang
function Header() {
  //const style = { color: "red", fontSize: "32px", textTransform: "uppercase" };
  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

// Component Menu - hiển thị danh sách pizza
function Menu() {
  const pizzas = pizzaData;

  return (
    <main className="menu">
      <h2>Our menu</h2>

      {pizzas.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from oue stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObject={pizza} key={pizza.name}></Pizza>
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Plesse come back later.</p>
      )}

      {/* <Pizza
        name="Focaccia"
        ingredients="Bread with italian olive oil and rosemary"
        price={10}
        photoName="pizzas/focaccia.jpg"
      />*/}
    </main>
  );
}

// Component Pizza - hiển thị thông tin chi tiết của từng pizza
function Pizza({ pizzaObject }) {
  //if (pizzaObject.soldOut) return null;

  // Thêm class sold-out nếu pizza đã hết hàng
  return (
    <li className={`pizza ${pizzaObject.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObject.photoName} alt={pizzaObject.name}></img>
      <div>
        <h3>{pizzaObject.name}</h3>
        <p>{pizzaObject.ingredients}</p>
        <span>{pizzaObject.soldOut ? "SOLD OUT" : pizzaObject.price}</span>
      </div>
    </li>
  );
}

// Component Footer - hiển thị trạng thái mở cửa và nút đặt hàng
function Footer() {
  const hour = new Date().getHours();
  // Kiểm tra giờ mở cửa (từ 12h đến 22h)
  const isOpen = hour >= 12 && hour < 22;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order />
      ) : (
        <p>We're happy to welcome you between 12:00 and 22:00</p>
      )}
    </footer>
  );
}

// Component Order - hiển thị nút đặt hàng khi cửa hàng đang mở
function Order() {
  return (
    <div className="order">
      <p>We're open until 22:00. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  );
}
