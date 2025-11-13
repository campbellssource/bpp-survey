import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BPP Volunteer Survey",
  description: "Volunteer registration and data collection for BPP survey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
