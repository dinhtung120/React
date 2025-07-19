import Image from "next/image";
import Link from "next/link";

import bg from "@/public/bg.png";
export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="mb-10 text-8xl font-normal tracking-tight text-stone-50">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-stone-600 px-8 py-6 text-lg font-semibold text-stone-900 transition-all hover:bg-stone-500"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
