import Providers from "@/store/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Authenticating with Next.js, RTK Query, and JWTs",
  description:
    "A demo of how to authenticate with Next.js, RTK Query, and JWTs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          {children}
          </Providers>
      </body>
    </html>
  );
}
