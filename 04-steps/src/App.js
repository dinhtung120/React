import { useState } from "react";

// Mảng chứa các thông điệp cho từng bước
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  // State quản lý bước hiện tại (1-3)
  const [step, setStep] = useState(1);
  // State để điều khiển việc hiển thị/ẩn component
  const [isOpen, setIsOpen] = useState(true);

  // Hàm xử lý khi nhấn nút Previous
  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }
  // Hàm xử lý khi nhấn nút Next
  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }

  return (
    <>
      {/* Nút đóng để ẩn/hiện component */}
      <button className="close" onClick={() => setIsOpen((open) => !open)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          {/* Hiển thị các số bước */}
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          {/* Hiển thị thông điệp của bước hiện tại */}
          <p className="message">
            Step {step} : {messages[step - 1]}{" "}
          </p>

          {/* Các nút điều hướng */}
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
