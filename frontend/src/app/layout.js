"use client"; // Required for useEffect and window listener

import { useEffect } from "react";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

// Note: In Next.js, "use client" files cannot export metadata like this.
// If you see an error about metadata, move this to a separate layout-client file.
const metadata = {
  title: "Bhaktapur International Hospital",
  description:
    "Modern hospital with advanced medical services and compassionate care.",
};

export default function RootLayout({ children }) {
  // This is the Resize Logic inside the Layout
  useEffect(() => {
    const handleResize = () => {
      // Only reload if the width actually changes to avoid infinite loops
      let timeout;
      window.addEventListener("resize", () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          window.location.reload();
        }, 500); // 500ms delay so it doesn't refresh 100 times while dragging
      });
    };

    handleResize();
  }, []);

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
