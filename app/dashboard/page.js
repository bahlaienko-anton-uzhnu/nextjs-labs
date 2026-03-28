import { books } from "@/lib/books";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  const total = books.length;
  const available = books.filter((b) => b.available).length;
  const unavailable = books.filter((b) => !b.available).length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Огляд бібліотеки</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="text-4xl mb-3">📚</div>
          <h3 className="text-gray-500 text-lg mb-2">Всього книг</h3>
          <p className="text-4xl font-bold text-gray-900">{total}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="text-gray-500 text-lg mb-2">В наявності</h3>
          <p className="text-4xl font-bold text-green-600">{available}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="text-4xl mb-3">❌</div>
          <h3 className="text-gray-500 text-lg mb-2">Немає</h3>
          <p className="text-4xl font-bold text-red-500">{unavailable}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Останні книги</h2>

        <div className="space-y-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="border border-gray-200 rounded-xl p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{book.emoji}</span>
                <div>
                  <p className="font-semibold text-gray-900">{book.name}</p>
                  <p className="text-sm text-gray-500">{book.category}</p>
                </div>
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
          ))}
        </div>
      </div>
    </div>
  );
}