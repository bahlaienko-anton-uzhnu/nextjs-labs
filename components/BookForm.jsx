'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'

import { createBookSchema } from '@/lib/validations/book'
import FormField from '@/components/forms/FormField'

const CATEGORIES = ['Фантастика', 'Роман', 'Детектив', 'Поезія', 'Інше']

export default function BookForm({
  mode = 'create',
  initialData,
  bookId,
}) {
  const router = useRouter()
  const isEdit = mode === 'edit'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      category: initialData?.category ?? '',
      price: initialData?.price ?? 0,
      description: initialData?.description ?? '',
      emoji: initialData?.emoji ?? '📘',
      available: initialData?.available ?? true,
    },
  })

  async function onSubmit(data) {
    const url = isEdit
      ? `/api/books/${bookId}`
      : '/api/books'

    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const body = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(
          body.errors?.join(', ') ||
          body.error ||
          'Помилка збереження'
        )
      }

      toast.success(
        isEdit
          ? 'Книгу оновлено'
          : 'Книгу додано'
      )

      router.push(
        isEdit
          ? `/dashboard/books/${bookId}`
          : '/dashboard/books'
      )

      router.refresh()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Назва *" error={errors.name?.message}>
          <input
            type="text"
            {...register('name')}
            className="w-full px-4 py-2 border rounded text-black bg-white"
          />
        </FormField>

        <FormField label="Категорія *" error={errors.category?.message}>
          <select
            {...register('category')}
            className="w-full px-4 py-2 border rounded text-black bg-white"
          >
            <option value="">Оберіть категорію</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Ціна (грн) *" error={errors.price?.message}>
          <input
            type="number"
            step="1"
            {...register('price', { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded text-black bg-white"
          />
        </FormField>

        <FormField label="Emoji" error={errors.emoji?.message}>
          <input
            type="text"
            {...register('emoji')}
            className="w-full px-4 py-2 border rounded text-black bg-white"
          />
        </FormField>
      </div>

      <FormField label="Опис" error={errors.description?.message}>
        <textarea
          rows="4"
          {...register('description')}
          className="w-full px-4 py-2 border rounded text-black bg-white"
        />
      </FormField>

      <label className="inline-flex items-center gap-2 text-gray-700">
        <input
          type="checkbox"
          {...register('available')}
          className="w-4 h-4"
        />
        В наявності
      </label>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 font-bold disabled:opacity-50"
        >
          {isSubmitting
            ? 'Збереження...'
            : isEdit
              ? 'Зберегти зміни'
              : 'Створити'}
        </button>

        <Link
          href={isEdit ? `/dashboard/books/${bookId}` : '/dashboard/books'}
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 font-bold inline-block"
        >
          Скасувати
        </Link>
      </div>
    </form>
  )
}