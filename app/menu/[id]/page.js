import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookById } from "@/lib/books";

export default async function BookPage({ params }) {
  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/menu" className="text-green-200 hover:text-white transition">
            ← Назад до каталогу
          </Link>

          <div className="mt-6 flex items-center gap-6">
            <span className="text-7xl">{book.emoji}</span>
            <div>
              <h1 className="text-4xl font-bold">{book.name}</h1>
              <p className="text-green-200 text-lg mt-2">{book.category}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-bold text-gray-500 mb-2">Ціна</h3>
                <p className="text-2xl font-bold text-green-700">{book.price} грн</p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-500 mb-2">Наявність</h3>
                {book.available ? (
                  <span className="text-green-600 font-semibold">В наявності</span>
                ) : (
                  <span className="text-red-600 font-semibold">Тимчасово немає</span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-500 mb-2">Опис</h3>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-500 mb-2">Категорія</h3>
              <p className="text-gray-700">{book.category}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}