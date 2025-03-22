import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QuizProvider } from "./_context/QuizContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiz",
  description: "Very random quiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QuizProvider>
          {children}
        </QuizProvider>
      </body>
    </html>
  );
}
