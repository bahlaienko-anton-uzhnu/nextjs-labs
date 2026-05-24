'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'

import { registerFormSchema } from '@/lib/validations/auth'
import FormField from '@/components/forms/FormField'

export default function RegisterForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      const body = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError('email', {
          type: 'server',
          message: body.error || 'Помилка реєстрації',
        })

        throw new Error(body.error || 'Помилка реєстрації')
      }

      toast.success('Акаунт створено')
      router.push('/login')
      router.refresh()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-black">
        <h1 className="text-3xl font-bold text-center mb-2">
          Реєстрація
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Створи акаунт для входу в систему
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Імʼя" error={errors.name?.message}>
            <input
              type="text"
              placeholder="Введи імʼя"
              {...register('name')}
              className="w-full px-4 py-3 border rounded-xl text-black bg-white"
            />
          </FormField>

          <FormField label="Email" error={errors.email?.message}>
            <input
              type="email"
              placeholder="Введи email"
              {...register('email')}
              className="w-full px-4 py-3 border rounded-xl text-black bg-white"
            />
          </FormField>

          <FormField label="Пароль" error={errors.password?.message}>
            <input
              type="password"
              placeholder="Введи пароль"
              {...register('password')}
              className="w-full px-4 py-3 border rounded-xl text-black bg-white"
            />
          </FormField>

          <FormField
            label="Підтвердження пароля"
            error={errors.confirmPassword?.message}
          >
            <input
              type="password"
              placeholder="Повтори пароль"
              {...register('confirmPassword')}
              className="w-full px-4 py-3 border rounded-xl text-black bg-white"
            />
          </FormField>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 font-bold disabled:opacity-50 shadow-lg"
          >
            {isSubmitting ? 'Створення...' : 'Зареєструватися'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Уже є акаунт?
        </p>

        <div className="mt-3 text-center">
          <Link
            href="/login"
            className="inline-block border border-green-600 text-green-700 px-6 py-2 rounded-xl hover:bg-green-50"
          >
            Увійти
          </Link>
        </div>
      </div>
    </div>
  )
}