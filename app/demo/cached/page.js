export default async function CachedPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  const post = await response.json()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-white">
        Закешований пост
      </h1>

      <div className="bg-blue-500/20 border border-blue-400/30 text-blue-200 p-4 rounded-xl mb-8">
        <p>
          Цей пост кешується. У dev-режимі різницю майже не видно.
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