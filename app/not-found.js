import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="mb-6">Сторінка не знайдена</p>
      <Link href="/" className="text-green-600 underline">
        На головну
      </Link>
    </div>
  );
}