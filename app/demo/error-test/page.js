export const dynamic = 'force-dynamic'

export default async function ErrorTestPage() {
  const shouldFail = Math.random() > 0.5

  if (shouldFail) {
    throw new Error('Випадкова помилка для тестування error.js')
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-green-500/20 border border-green-400/30 text-green-200 p-6 rounded-2xl max-w-2xl">
        <h1 className="text-3xl font-bold mb-3">
          Успіх! Помилки не сталося
        </h1>
        <p>
          Онови сторінку — є 50% шанс помилки.
        </p>
      </div>
    </div>
  )
}