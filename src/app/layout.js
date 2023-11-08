import Providers from "@/store/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "./provider";
import Navbar_UI from "@/components/navbar/Navbar";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "K-QuickSight",
  description:
    "Catalyze your data journey with our powerful tools for discovery, analysis, and informed decision-making. Explore your data's full potential and drive success with confidence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background-color">
        <Provider>
          <Suspense fallback={<Loading />}>
            <Providers>
              <Navbar_UI />
              {children}
            </Providers>
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
