"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        router.push("/login");
      }
    } catch (error) {
      setMessage("Помилка підключення до сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/40">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Реєстрація</h1>
          <p className="text-gray-600 mt-2">
            Створи акаунт для входу в систему
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ім&apos;я
            </label>
            <input
              type="text"
              placeholder="Введи ім'я"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <input
              type="password"
              placeholder="Введи пароль"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 transition shadow-lg"
          >
            {loading ? "Реєстрація..." : "Зареєструватися"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-800">{message}</p>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Уже є акаунт?
          </p>
          <Link
            href="/login"
            className="inline-block mt-3 rounded-xl border border-green-600 text-green-700 hover:bg-green-50 px-5 py-2 font-medium transition"
          >
            Увійти
          </Link>
        </div>
      </div>
    </div>
  );
}