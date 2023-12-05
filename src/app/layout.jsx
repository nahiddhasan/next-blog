import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import AuthProvider from "@/provider/AuthProvider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextJs Blog application",
  description: "Share your opinion with this site",
};

export default function RootLayout({ children, authModal }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {authModal}
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
