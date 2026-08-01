import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atendente Virtual - Cursos",
  description:
    "Painel para sugerir o melhor curso com base em respostas inteligentes.",
};

function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavBar />
      <div className="mx-auto flex min-h-screen max-w-[1720px] flex-col gap-6 px-4 pb-10 pt-20 sm:px-6 md:flex-row lg:px-8">
        <div className="w-full mb-12 md:w-72">
          <SideBar />
        </div>
        <main className="w-full md:pl-0">{children}</main>
      </div>
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#040404] text-white">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
