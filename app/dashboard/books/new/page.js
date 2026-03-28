'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewBookPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Нова книга:", formData);
    router.push("/dashboard/books");
  };

  return (
    <div>
      <Link
        href="/dashboard/books"
        className="text-green-700 hover:underline mb-4 inline-block"
      >
        ← Назад до списку
      </Link>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Додати нову книгу</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Назва *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Категорія *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Ціна (грн) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Опис</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-600"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 font-bold"
            >
              Створити
            </button>

            <Link
              href="/dashboard/books"
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 font-bold inline-block"
            >
              Скасувати
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}