import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

function SignOutButton() {
  return (
    <button className="flex w-full items-center gap-4 px-5 py-3 font-semibold text-stone-200 transition-colors hover:bg-stone-900 hover:text-stone-100">
      <ArrowRightOnRectangleIcon className="h-5 w-5 text-stone-600" />
      <span>Sign out</span>
    </button>
  );
}

export default SignOutButton;
