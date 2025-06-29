// Import hook để lấy dữ liệu được load từ loader function
import { useLoaderData } from "react-router-dom";
// Import service để fetch dữ liệu menu từ API
import { getMenu } from "../../services/apiRestaurant";
// Import component con để hiển thị từng pizza
import MenuItem from "./MenuItem";

/**
 * Component Menu - Trang hiển thị danh sách tất cả pizza
 * Dữ liệu được load trước khi component render thông qua loader function
 */
function Menu() {
  // Lấy dữ liệu menu đã được load từ loader function
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {/* Render danh sách pizza */}
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

/**
 * Loader function - Chạy trước khi component render
 * Fetch dữ liệu menu từ API và trả về cho component
 * @returns {Promise<Array>} Danh sách pizza
 */
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
