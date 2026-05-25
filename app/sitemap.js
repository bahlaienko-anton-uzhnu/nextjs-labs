import dbConnect from "@/lib/db";
import Book from "@/lib/models/Book";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const staticRoutes = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  let dynamicRoutes = [];

  try {
    await dbConnect();

    const books = await Book.find({ available: true })
      .select("_id updatedAt")
      .lean();

    dynamicRoutes = books.map((book) => ({
      url: `${siteUrl}/menu/${book._id}`,
      lastModified: book.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {}

  return [...staticRoutes, ...dynamicRoutes];
}