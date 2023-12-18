import Providers from "@/store/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "./provider";
import Navbar_UI from "@/components/navbar/Navbar";
import { Suspense } from "react";
import { AOSInit } from "./aos";
import Loading from "./loading";
import AuthProvider from "./AuthProvider";
import Footer from "@/components/footer/footer";
import { SidebarProvider } from "@/context/BoardSideBarContext";
import { PreviewProvider } from "@/context/EditorPreviewContext";
import NoInternetConnection from "@/app/NoInternetConnection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <AOSInit />
        <NoInternetConnection>
          <SidebarProvider>
            <PreviewProvider>
              <Provider>
                <Suspense fallback={<Loading />}>
                  <Providers>
                    <AuthProvider>
                      <Navbar_UI />
                      <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                      />
                      {children}
                      <Footer />
                    </AuthProvider>
                  </Providers>
                </Suspense>
              </Provider>
            </PreviewProvider>
          </SidebarProvider>
        </NoInternetConnection>
      </body>
    </html>
  );
}
