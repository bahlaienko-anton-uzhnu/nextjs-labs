import "./globals.css";
import { Toaster } from "sonner";

import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Бібліотека",
  description: "Система управління бібліотекою",
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