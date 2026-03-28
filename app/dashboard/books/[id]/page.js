import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookById } from "@/lib/books";

export default async function BookDetailPage({ params }) {
  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/dashboard/books"
        className="text-green-700 hover:underline mb-4 inline-block"
      >
        ← Назад до списку
      </Link>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{book.emoji}</span>
            <h1 className="text-3xl font-bold text-gray-900">{book.name}</h1>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              book.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {book.available ? "В наявності" : "Немає"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-gray-500 text-sm font-bold mb-1">Категорія</h3>
            <p className="text-lg text-gray-900">{book.category}</p>
          </div>

          <div>
            <h3 className="text-gray-500 text-sm font-bold mb-1">Ціна</h3>
            <p className="text-lg text-gray-900">{book.price} грн</p>
          </div>
        </div>

        <div>
          <h3 className="text-gray-500 text-sm font-bold mb-2">Опис</h3>
          <p className="text-gray-700">{book.description}</p>
        </div>
      </div>
    </div>
  );
}