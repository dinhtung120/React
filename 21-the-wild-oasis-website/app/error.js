"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        onClick={reset}
        className="inline-block bg-stone-500 px-6 py-3 text-lg text-stone-800"
      >
        Try again
      </button>
    </main>
  );
}
