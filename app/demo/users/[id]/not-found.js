import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-white">
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Користувача не знайдено</h2>
        <p className="text-gray-300 mb-8">Користувач з таким ID не існує</p>

        <Link
          href="/demo/users/1"
          className="inline-block bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          До користувача #1
        </Link>
      </div>
    </div>
  )
}