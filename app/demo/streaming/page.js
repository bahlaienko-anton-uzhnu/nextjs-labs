import { Suspense } from 'react'

async function FastStats() {
  await new Promise(resolve => setTimeout(resolve, 500))

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-gray-500 text-sm">Швидка стата 1</h3>
        <p className="text-3xl font-bold text-blue-600">123</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-gray-500 text-sm">Швидка стата 2</h3>
        <p className="text-3xl font-bold text-green-600">456</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-gray-500 text-sm">Швидка стата 3</h3>
        <p className="text-3xl font-bold text-red-600">789</p>
      </div>
    </div>
  )
}

async function SlowPosts() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
  const posts = await response.json()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Повільні пости</h2>

      {posts.map(post => (
        <article key={post.id} className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-bold mb-2 text-black">{post.title}</h3>
          <p className="text-gray-700">{post.body}</p>
        </article>
      ))}
    </div>
  )
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {[1, 2, 3].map(item => (
        <div key={item} className="bg-white rounded-2xl shadow p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      ))}
    </div>
  )
}

function PostsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>

      {[1, 2, 3].map(item => (
        <div key={item} className="bg-white rounded-2xl shadow p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  )
}

export default function StreamingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-white">Streaming Demo</h1>

      <div className="bg-blue-500/20 border border-blue-400/30 text-blue-200 p-4 rounded-xl mb-8">
        Спочатку з’являться швидкі статистики, а потім повільні пости.
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <FastStats />
      </Suspense>

      <Suspense fallback={<PostsSkeleton />}>
        <SlowPosts />
      </Suspense>
    </div>
  )
}