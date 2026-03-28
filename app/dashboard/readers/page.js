const readers = [
  { id: 1, name: "Іван Петренко", email: "ivan@gmail.com", status: "Активний" },
  { id: 2, name: "Марія Коваль", email: "maria@gmail.com", status: "Активний" },
  { id: 3, name: "Олег Сидоренко", email: "oleg@gmail.com", status: "Неактивний" },
];

export const metadata = {
  title: "Читачі",
};

export default function ReadersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Читачі</h1>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ім’я</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {readers.map((reader) => (
              <tr key={reader.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{reader.name}</td>
                <td className="px-6 py-4 text-gray-700">{reader.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      reader.status === "Активний"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {reader.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}