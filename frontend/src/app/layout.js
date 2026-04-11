import "./globals.css";
import MainLayout from "@components/layout/MainLayout";

export const metadata = {
  title: "Bhaktapur International Hospital",
  description: "Modern hospital with advanced medical services and compassionate care.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}