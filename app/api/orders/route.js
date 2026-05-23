import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";
import OrderItem from "@/lib/models/OrderItem";
import Book from "@/lib/models/Book";
import User from "@/lib/models/User";
import { authorize } from "@/lib/authorize";
import { createOrderSchema } from "@/lib/validations/order";
import { sanitizeObject } from "@/lib/sanitize";

void [User, Book, OrderItem];

export async function GET(request) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const book = searchParams.get("book");

  const filter =
    session.user.role === "admin" ? {} : { user: session.user.id };

  if (status) filter.status = status;

  if (book) {
    const orderIds = await OrderItem.find({ book }).distinct("order");
    filter._id = { $in: orderIds };
  }

  const orders = await Order.find(filter)
    .populate({ path: "user", select: "name email role" })
    .populate({
      path: "items",
      populate: { path: "book", select: "name price emoji category" },
    })
    .sort({ createdAt: -1 });

  return Response.json(orders);
}

export async function POST(request) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();

  let createdOrderId = null;

  try {
    const data = await request.json();

    const result = createOrderSchema.safeParse(data);

    if (!result.success) {
      const messages = result.error.issues.map((e) => e.message);
      return Response.json({ errors: messages }, { status: 400 });
    }

    const sanitized = sanitizeObject(result.data);

    let orderUserId = session.user.id;

    if (session.user.role === "admin" && sanitized.user) {
      const targetUser = await User.findById(sanitized.user);

      if (!targetUser) {
        return Response.json(
          { error: "Користувача не знайдено" },
          { status: 404 }
        );
      }

      orderUserId = targetUser._id;
    }

    const bookIds = sanitized.items.map((i) => i.book);
    const books = await Book.find({ _id: { $in: bookIds } });

    const bookById = new Map(
      books.map((b) => [b._id.toString(), b])
    );

    for (const item of sanitized.items) {
      const book = bookById.get(item.book);

      if (!book) {
        return Response.json(
          { error: `Книгу не знайдено: ${item.book}` },
          { status: 404 }
        );
      }

      if (book.available === false) {
        return Response.json(
          { error: `Книга зараз недоступна: ${book.name}` },
          { status: 409 }
        );
      }
    }

    const totalPrice = sanitized.items.reduce((sum, item) => {
      const book = bookById.get(item.book);
      return sum + book.price * item.quantity;
    }, 0);

    const order = await Order.create({
      user: orderUserId,
      totalPrice,
      notes: sanitized.notes,
    });

    createdOrderId = order._id;

    const itemsToCreate = sanitized.items.map((item) => {
      const book = bookById.get(item.book);

      return {
        order: order._id,
        book: book._id,
        quantity: item.quantity,
        priceAtOrder: book.price,
      };
    });

    await OrderItem.insertMany(itemsToCreate);

    const populated = await Order.findById(order._id)
      .populate({ path: "user", select: "name email" })
      .populate({
        path: "items",
        populate: { path: "book", select: "name price emoji category" },
      });

    return Response.json(populated, { status: 201 });
  } catch (err) {
    if (createdOrderId) {
      try {
        await Order.deleteOne({ _id: createdOrderId });
      } catch {}
    }

    return Response.json(
      { error: "Помилка сервера" },
      { status: 500 }
    );
  }
}