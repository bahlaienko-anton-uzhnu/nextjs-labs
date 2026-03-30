import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookById } from "@/lib/books";
import DrinkActions from "@/components/DrinkActions";

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

      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{book.emoji}</span>
            <h1 className="text-3xl font-bold text-gray-900">{book.name}</h1>
          </div>

          <DrinkActions drinkId={book.id} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-gray-500 text-sm font-bold mb-1">Категорія</h3>
            <p className="text-lg text-gray-900">{book.category}</p>
          </div>

          <div>
            <h3 className="text-gray-500 text-sm font-bold mb-1">Ціна</h3>
            <p className="text-lg text-gray-900">{book.price} грн</p>
          </div>

          <div>
            <h3 className="text-gray-500 text-sm font-bold mb-1">Наявність</h3>
            {book.available ? (
              <span className="text-green-600 font-semibold">В наявності</span>
            ) : (
              <span className="text-red-600 font-semibold">Немає</span>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-gray-500 text-sm font-bold mb-2">Опис</h3>
          <p className="text-gray-700">{book.description}</p>
        </div>
      </div>
    </div>
  );
}