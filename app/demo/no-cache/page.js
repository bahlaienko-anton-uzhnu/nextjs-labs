export default async function NoCachePage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/3', {
    cache: 'no-store'
  })
  const post = await response.json()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-white">
        Пост без кешу
      </h1>

      <div className="bg-red-500/20 border border-red-400/30 text-red-200 p-4 rounded-xl mb-8">
        <p>
          Цей пост не кешується. Кожне оновлення — новий запит до API.
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