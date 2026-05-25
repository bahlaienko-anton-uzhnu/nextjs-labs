import "./globals.css";
import { Toaster } from "sonner";

import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Бібліотека",
    template: "%s | Бібліотека",
  },

  description:
    "Система управління бібліотекою: книги, користувачі, замовлення та бронювання.",

  keywords: [
    "бібліотека",
    "книги",
    "замовлення",
    "Next.js",
    "MongoDB",
  ],

  authors: [{ name: "Бібліотека" }],

  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "/",
    siteName: "Бібліотека",
    title: "Бібліотека",
    description:
      "Система управління бібліотекою: книги, користувачі, замовлення та бронювання.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Бібліотека",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Бібліотека",
    description:
      "Система управління бібліотекою: книги, користувачі, замовлення та бронювання.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}