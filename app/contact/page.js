export default function ContactPage() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">Контакти</h1>
          <p className="text-lg opacity-90">
            Завітайте до нашої бібліотеки 📚
          </p>
        </div>
      </section>

      {/* КОНТАКТИ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 flex justify-center">
          
          <div className="bg-white p-10 rounded-xl shadow-md max-w-xl w-full text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Наші контакти
            </h2>

            <div className="space-y-4 text-gray-700 text-lg">
              <p>📍 м. Ужгород, вул. Павлова 2а</p>
              <p>📞 +380 957866121</p>
              <p>📧 library@gmail.com</p>
              <p>🕒 Пн–Пт: 09:00 – 18:00</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}