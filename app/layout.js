import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

export const metadata = {
  title: "Бібліотека",
  description: "Система управління бібліотекою",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className="min-h-screen flex flex-col">
        <SessionWrapper>
          <FavoritesProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </FavoritesProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}