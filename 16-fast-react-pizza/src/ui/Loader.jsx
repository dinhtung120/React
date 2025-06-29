/**
 * Component hiển thị loading spinner
 * Được sử dụng khi ứng dụng đang tải dữ liệu từ API
 */
function Loader() {
  return (
    // Container phủ toàn màn hình với background mờ
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-xs">
      {/* Spinner loading - CSS được định nghĩa trong index.css */}
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
