export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Про нашу бібліотеку</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Сучасна бібліотека для зручного пошуку, перегляду та вибору книг за категоріями.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Хто ми
          </h2>

          <p className="text-gray-700 text-lg mb-4">
            Наша бібліотека — це сучасний інформаційний простір, створений для зручного доступу до книг,
            навчальних матеріалів та художньої літератури. Ми прагнемо зробити пошук потрібної книги
            простим, швидким і зрозумілим для кожного користувача.
          </p>

          <p className="text-gray-700 text-lg mb-4">
            Система управління бібліотекою допомагає працювати з каталогом книг, переглядати категорії,
            перевіряти наявність потрібної літератури та знаходити популярні видання. Завдяки зручному
            інтерфейсу користувач може швидко знайти необхідну книгу за назвою або тематикою.
          </p>

          <p className="text-gray-700 text-lg mb-8">
            Цей проєкт створений у межах практичної роботи з використанням Next.js, компонентного підходу,
            props та useState. Основна мета — показати, як можна побудувати зручний та зрозумілий вебзастосунок
            для бібліотеки.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Великий каталог</h3>
              <p className="text-gray-700">
                У системі представлено книги різних жанрів: фантастика, класика, пригоди, поезія та інші.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Зручний пошук</h3>
              <p className="text-gray-700">
                Користувач може фільтрувати книги за категоріями та швидко знаходити потрібні позиції.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Актуальна наявність</h3>
              <p className="text-gray-700">
                У каталозі одразу видно, які книги доступні, а які тимчасово відсутні.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-green-50 border border-green-100 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-3 text-green-800">
              Наша мета
            </h3>
            <p className="text-gray-700 text-lg">
              Ми хочемо створити просту та корисну систему, яка допоможе користувачам швидко орієнтуватися
              у бібліотечному фонді, знаходити потрібну літературу та отримувати зручний доступ до інформації.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}