// Import React và ReactDOM
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import Redux Provider để cung cấp store cho toàn bộ app
import { Provider } from "react-redux";

// Import component và store chính
import App from "./App.jsx";
import store from "./store.js";

// Import CSS toàn cục
import "./index.css";

// Tạo root và render ứng dụng
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provider bọc toàn bộ app để cung cấp Redux store */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
