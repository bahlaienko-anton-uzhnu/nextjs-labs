export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="container mx-auto px-6 py-10 text-center">
        
        <h3 className="text-2xl font-semibold mb-2">
          📚 Система управління бібліотекою
        </h3>

        <p className="text-gray-400 mb-4">
          м. Ужгород | Онлайн каталог книг
        </p>

        <div className="flex justify-center gap-6 mb-4 text-sm">
          <span className="hover:text-green-400 cursor-pointer">Контакти</span>
          <span className="hover:text-green-400 cursor-pointer">Допомога</span>
          <span className="hover:text-green-400 cursor-pointer">Політика</span>
        </div>

        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Баглаєнко Антон
        </p>
      </div>
    </footer>
  );
}