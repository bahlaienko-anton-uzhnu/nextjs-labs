import Link from "next/link";
import { books } from "@/lib/books";

export const metadata = {
  title: "Книги",
};

export default function BooksPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Книги</h1>
        <Link
          href="/dashboard/books/new"
          className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition"
        >
          + Додати книгу
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Назва</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Категорія</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ціна</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дії</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span>{book.emoji}</span>
                    <span className="font-medium text-gray-900">{book.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{book.category}</td>
                <td className="px-6 py-4 text-gray-700">{book.price} грн</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      book.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.available ? "В наявності" : "Немає"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/books/${book.id}`}
                    className="text-green-700 hover:underline"
                  >
                    Переглянути
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}