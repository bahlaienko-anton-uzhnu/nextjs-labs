import { auth } from "@/auth";

export async function authorize(requiredRole = null) {
  const session = await auth();

  if (!session || !session.user) {
    return {
      session: null,
      error: Response.json(
        { error: "Необхідно увійти в систему" },
        { status: 401 }
      ),
    };
  }

  if (requiredRole && session.user.role !== requiredRole) {
    return {
      session: null,
      error: Response.json(
        { error: `Потрібна роль: ${requiredRole}` },
        { status: 403 }
      ),
    };
  }

  return { session, error: null };
}