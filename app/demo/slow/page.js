export default async function SlowPage() {
  await new Promise(resolve => setTimeout(resolve, 3000))

  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await response.json()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Повільна сторінка (3 сек)
      </h1>

      <div className="bg-yellow-500/20 border border-yellow-400/30 text-yellow-200 p-4 rounded-xl mb-8">
        Ця сторінка спеціально грузиться 3 секунди
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.slice(0, 6).map(post => (
          <div key={post.id} className="bg-white p-4 rounded shadow text-black">
            <h2 className="font-bold mb-2">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}