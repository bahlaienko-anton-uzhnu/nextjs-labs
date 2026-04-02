import { notFound } from 'next/navigation'

const users = {
  '1': { id: 1, name: 'John Doe', role: 'Admin' },
  '2': { id: 2, name: 'Jane Smith', role: 'Editor' },
  '3': { id: 3, name: 'Bob Johnson', role: 'User' }
}

export default async function UserPage({ params }) {
  const { id } = await params
  const user = users[id]

  if (!user) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-white">
        Профіль користувача
      </h1>

      <div className="bg-purple-500/20 border border-purple-400/30 text-purple-200 p-4 rounded-xl mb-8 max-w-2xl">
        Перегляд інформації про користувача
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-black">
          {user.name}
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold text-black">ID:</span> {user.id}
          </p>

          <p>
            <span className="font-semibold text-black">Роль:</span> {user.role}
          </p>
        </div>

        <div className="mt-6">
          <a
            href="/demo/users/1"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            До користувача #1
          </a>
        </div>
      </div>
    </div>
  )
}