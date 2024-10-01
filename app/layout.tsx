import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import { ClerkProvider, GoogleOneTap } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kurta Glow",
  description: "An ecommerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
    <ClerkProvider>
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <GoogleOneTap/>
        <ModalProvider />
        <ToastProvider/>
        <Navbar/>
        {children}
      <Footer>
      </Footer>
      </ThemeProvider>
        </body>
    </ClerkProvider>

    </html>
  );
}
