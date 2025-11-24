import type { Metadata } from "next";
import { Inter, DM_Serif_Display, DM_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "The Adult AP Course Load",
  description: "Don't peak in high school. Rebuild your grown-up life like the overachiever you used to be.",
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSerif.variable} ${dmMono.variable} font-sans antialiased bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}
