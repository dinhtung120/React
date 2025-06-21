import { Link } from "react-router-dom";

function Button({ children, disabled, to, type }) {
  const base =
    "text-sm inline-block rounded-full bg-yellow-400 font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed ";

  const styles = {
    primary: base + "px-3 py-2 md:px-4 md:py-3",
    small: base + "px-2 py-1 md:px-3 md:py-2 text-xs ",
    secondary:
      "text-sm px-3 py-2 md:px-3.5 md:py-2.5 inline-block rounded-full border-2 border-stone-300 font-semibold tracking-wide text-stone-400 focus:text-stone-700 hover:text-stone-700 uppercase transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:ring focus:ring-stone-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed ",
  };
  if (to)
    return (
      <Link to={to} className={styles[type]} disabled={disabled}>
        {children}
      </Link>
    );
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
