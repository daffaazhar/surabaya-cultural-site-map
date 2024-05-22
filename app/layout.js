import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pemetaan Situs Budaya di Surabaya",
  description:
    "Penyedia sumber informasi tentang situs budaya yang ada di Surabaya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
