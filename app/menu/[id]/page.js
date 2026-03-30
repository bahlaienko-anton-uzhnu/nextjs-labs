import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookById } from "@/lib/books";
import FavoriteButton from "@/components/FavoriteButton";

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
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold">{book.name}</h1>
                <FavoriteButton drinkId={book.id} />
              </div>
              <p className="text-green-200 text-lg mt-2">{book.category}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <p className="text-gray-700 mb-4">{book.description}</p>
            <p className="text-green-700 font-bold text-2xl mb-2">{book.price} грн</p>
            <p className="text-gray-600">{book.available ? "В наявності" : "Немає"}</p>
          </div>
        </div>
      </section>
    </div>
  );
}