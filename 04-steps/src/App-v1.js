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
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          {/* Các nút điều hướng */}
          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span> 👈 </span>Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next <span> 👉 </span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
