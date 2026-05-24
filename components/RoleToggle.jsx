'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function RoleToggle({
  userId,
  currentRole,
  currentUserId,
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  if (userId === currentUserId) {
    return (
      <span className="text-xs text-gray-400">
        (ви)
      </span>
    )
  }

  const newRole =
    currentRole === 'admin' ? 'user' : 'admin'

  async function handleToggle() {
    setLoading(true)

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: newRole,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'Помилка зміни ролі')
      }

      toast.success(`Роль змінено: ${newRole}`)
      router.refresh()
    } catch (error) {
      toast.error(error.message || "Помилка з'єднання")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition disabled:opacity-50"
    >
      {loading ? '...' : `→ ${newRole}`}
    </button>
  )
}