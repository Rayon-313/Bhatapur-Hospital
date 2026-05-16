"use client";

import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const metadata = {
  title: "Bhaktapur International Hospital",
  description:
    "Modern hospital with advanced medical services and compassionate care.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}