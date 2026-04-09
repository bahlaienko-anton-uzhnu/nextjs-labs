import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 p-6">
      
      <div className="max-w-4xl mx-auto">
        
        {/* Заголовок */}
        <div className="bg-white shadow-xl rounded-3xl p-8 mb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard 🚀
          </h1>
          <p className="text-gray-600">
            Ласкаво просимо в систему
          </p>
        </div>

        {/* Інфо про користувача */}
        <div className="bg-white shadow-xl rounded-3xl p-6 mb-6">
          <p className="text-gray-700 text-lg">
            Ви увійшли як:
          </p>
          <p className="text-xl font-semibold text-black mt-1">
            {session.user.email}
          </p>
        </div>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-gray-500 mb-2">📚 Книг</h2>
            <p className="text-3xl font-bold text-blue-600">10</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-gray-500 mb-2">✅ В наявності</h2>
            <p className="text-3xl font-bold text-green-600">8</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-gray-500 mb-2">💰 Середня ціна</h2>
            <p className="text-3xl font-bold text-indigo-600">237 грн</p>
          </div>

        </div>

        {/* Кнопка виходу */}
        <div className="text-center">
          <LogoutButton />
        </div>

      </div>
    </div>
  );
}