export const revalidate = 10

export default async function RevalidatedPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/2')
  const post = await response.json()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-white">
        Revalidated пост
      </h1>

      <div className="bg-green-500/20 border border-green-400/30 text-green-200 p-4 rounded-xl mb-8">
        <p>
          Цей пост оновлюється кожні 10 секунд (в production).
        </p>
      </div>

      <article className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-black">
          {post.title}
        </h2>

        <p className="text-gray-700 leading-relaxed">
          {post.body}
        </p>

        <div className="mt-6 text-sm text-gray-500">
          Завантажено: {new Date().toLocaleTimeString()}
        </div>
      </article>
    </div>
  )
}