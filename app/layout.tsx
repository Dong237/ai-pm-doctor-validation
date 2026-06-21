import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IndiePM Clinic",
  description: "AI-assisted, human-reviewed PM diagnosis for indie builders before the next build sprint."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
