import Header from "./components/header/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import GlobalProvider from "./components/GlobalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Ecommerce",
  description: "A full stack e-commerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <Header />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
