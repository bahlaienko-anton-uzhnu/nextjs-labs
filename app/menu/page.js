import MenuFilter from "@/components/MenuFilter";

export default function MenuPage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Каталог книг</h1>
          <p className="text-lg opacity-90">
            Оберіть книгу та перегляньте деталі
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <MenuFilter />
        </div>
      </section>
    </div>
  );
}